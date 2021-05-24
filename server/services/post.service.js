const { Op } = require('sequelize')
const db = require('../_helpers/db.js')
const roles = require('../_helpers/roles')
const { getUserById } = require('./user.service')
const { QueryTypes } = require('sequelize');
const { RequestError } = require('../_helpers/request-error')

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    updatePost,
    getPostsByUser,
    changePostVisibility,
    getPostsBySearch,
    createComment,
    createPostReact,
    createCommentReact,
    getAllComments,
    deleteCommentReactById,
    deletePostReactById,
    getHiddenPosts
}

async function createPost(params) {
    const post = await db.post.create(params)
    const { username, firstName, lastName } = await getUserById(params.userId)
    return { ...post.get(), user: { username, firstName, lastName }, reacts: [], comments: [] }
}

async function getAllPosts() {
    let posts = await db.post.findAll({
        where : {
            isSuspended: false,
            isHidden: false
        },
        include: [{
            model: db.user,
            required: true,
            attributes: ['username', 'firstName', 'lastName']
        }]
    })
    posts = posts.map(post => post.get({ plain: true }))

    return Promise.all(
        posts.map(async post => {
            const reacts = await getAllPostReacts(post.id)
            const comments = await getAllComments(post.id)
            return { ...post, comments, reacts }
        })
    )
}

async function getPostById(id) {
    const post = await db.post.findOne({
         where: { 
             id,
             isSuspended: false
          },
         include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username', 'firstName', 'lastName']
        }]
    })
    if (!post) throw new RequestError('Post not found', 404)

    const reacts = await getAllPostReacts(id)
    const comments = await getAllComments(id)
    return { post, reacts, comments }
}

async function deletePost(id, user) {
    const post = await db.post.findByPk(id)
    if (!post)
        throw new RequestError('Post not found', 404)
    if (user.id != post.userId && user.role != roles.Admin)
        throw new RequestError('Forbidden, user must be owner of the post or admin', 403)
    await post.destroy()
}

async function updatePost(id, params, userId) {
    const { post, reacts, comments } = await getPostById(id)
    if (userId != post.userId)
        throw new RequestError('Forbidden, user must be owner of the post', 403)
    Object.assign(post, params)
    post.updated = Date.now()
    await post.save()
    return { ...post.get(), reacts, comments }
}

async function getPostsByUser(id, loggedInId = null) {
    var posts = await db.post.findAll({ 
        where: { 
            userId: id,
            isSuspended: false,
         },
        include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username']
        }]
    })
    posts = posts.filter(post => post.userId != loggedInId && post.isHidden? false : true)
    posts = posts.map(post => post.get({ plain: true }))

    return Promise.all(
        posts.map(async post => {
            const reacts = await getAllPostReacts(post.id)
            const comments = await getAllComments(post.id)
            return { ...post, comments, reacts }
        })
    )
}

async function changePostVisibility(id, userId) {
    const { post, reacts, comments } = await getPostById(id)
    if (userId != post.userId)
        throw new RequestError('Forbidden, user must be owner of the post', 403)
    post.isHidden = !post.isHidden
    await post.save()
    return { ...post.get(), reacts, comments }
}

async function getPostsBySearch(value) {
    var posts = await db.post.findAll({ 
        where: { 
            [Op.or]: [
                { title: { [Op.substring]: value } },
                db.sequelize.where(db.sequelize.col("user.username"), "LIKE", `%${value}%`)
            ],
            isSuspended: false,
            isHidden: false
        },
        include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username', 'firstName', 'lastName']
        }]
    })
    posts = posts.map(post => post.get({ plain: true }))

    return Promise.all(
        posts.map(async post => {
            const reacts = await getAllPostReacts(post.id)
            const comments = await getAllComments(post.id)
            return { ...post, comments, reacts }
        })
    )
}

async function createComment(params, userId) {
    const comment = await db.comment.create({ ...params, userId })
    const { username, firstName, lastName } = await getUserById(userId)
    return { ...comment.get(), user: { username, firstName, lastName }, reacts: []}
}

async function createPostReact(params, userId) {
    const react = await db.postReact.create({ ...params, userId })
    const { username, firstName, lastName } = await getUserById(userId)
    return { ...react.get(), user: { username, firstName, lastName } }
}

async function createCommentReact(params, userId) {
    const react = await db.commentReact.create({ ...params, userId })
    const { username, firstName, lastName } = await getUserById(userId)
    return { ...react.get(), user: { username, firstName, lastName } }
}

async function getAllComments(postId) {
    let comments = await db.comment.findAll({ 
        where: { 
            postId,
            isSuspended: false 
        },
        include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username', 'firstName', 'lastName']
        }]
     })

     comments = comments.map(comment => comment.get({ plain: true }))
     return Promise.all(
         comments.map(async comment => {
             const reacts = await getAllCommentReacts(comment.id)
             return { ...comment, reacts }
         })
     )
}

async function getAllPostReacts(postId) {
    const reacts = await db.postReact.findAll({
        where: { postId },
        include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username', 'firstName', 'lastName']
        }]
    })

    return reacts
}

async function getAllCommentReacts(commentId) {
    const reacts = await db.commentReact.findAll({
        where: { commentId },
        include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username', 'firstName', 'lastName']
        }]
    })

    return reacts
}

async function deleteCommentReactById(reactId, userId) {
    const react = await db.commentReact.findByPk(reactId)
    if (!react) 
        throw new RequestError('React not found', 404)
    if (react.userId != userId)
        throw 'User id must match react\'s owner id'
    await react.destroy()
}

async function deletePostReactById(reactId, userId) {
    const react = await db.postReact.findByPk(reactId)
    if (!react) 
        throw new RequestError('React not found', 404)
    if (react.userId != userId)
        throw new RequestError('Forbidden, user id must match react\'s owner id', 403)
    await react.destroy()
}

async function getHiddenPosts(userId) {
    var posts = await db.post.findAll({ 
        where: { 
            userId, 
            isHidden: true,
            isSuspended: false 
        },
        include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username']
        }]
    })
    posts = posts.map(post => post.get({ plain: true }))

    return Promise.all(
        posts.map(async post => {
            const reacts = await getAllPostReacts(post.id)
            const comments = await getAllComments(post.id)
            return { ...post, comments, reacts }
        })
    )
}
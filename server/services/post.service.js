const { Op } = require('sequelize')
const db = require('../_helpers/db.js')
const roles = require('../_helpers/roles')

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    updatePost,
    getPostsByUser,
    changePostVisibility,
    getPostsByTitle,
    createComment,
    createPostReact,
    createCommentReact
}

async function createPost(params) {
    await db.post.create(params)
}

async function getAllPosts() {
    const posts = await db.post.findAll({ include: [{
        model: db.user,
        as: "user",
        required: true,
        attributes: ['username']
    }]})
    return posts
}

async function getPostById(id) {
    const post = await db.post.findOne({
         where: { id },
         include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username']
        }]
    })
    if (!post) throw 'Post not found'
    return post
}

async function deletePost(id, user) {
    const post = await getPostById(id)
    if (user.id != post.userId && user.role != roles.Admin)
        throw 'Unauthorized, user must be owner of the post or admin'
    await post.destroy()
}

async function updatePost(id, params, userId) {
    const post = await getPostById(id)
    if (userId != post.userId)
        throw 'Unauthorized, user must be owner of the post'
    Object.assign(post, params)
    post.updated = Date.now()
    await post.save()
    return post.get()
}

async function getPostsByUser(id) {
    const posts = await db.post.findAll({ 
        where: { userId: id },
        include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username']
        }]
    })
    return posts
}

async function changePostVisibility(id, userId) {
    const post = await getPostById(id)
    if (userId != post.userId)
        throw 'Unauthorized, user must be owner of the post'
    post.isHidden = !post.isHidden
    await post.save()
    return post.isHidden
}

async function getPostsByTitle({title}) {
    const posts = await db.post.findAll({ 
        where: { title: { [Op.substring]: title }},
        include: [{
            model: db.user,
            as: "user",
            required: true,
            attributes: ['username']
        }]
    })
    return posts
}

async function createComment(params, userId) {
    await db.comment.create({ ...params, userId })
}

async function createPostReact(params, userId) {
    await db.postReact.create({ ...params, userId })
}

async function createCommentReact(params, userId) {
    await db.commentReact.create({ ...params, userId })
}
const db = require("../_helpers/db.js");
const { RequestError } = require('../_helpers/request-error')
const roles = require('../_helpers/roles')

module.exports = {
    suspendCommentById,
    suspendPostById,
    suspendUserById,
    unsuspendCommentById,
    unsuspendPostById,
    unsuspendUserById,
    getAllSuspensions
}

async function suspendCommentById(params) {
    const comment = await db.comment.findByPk(params.commentId)
    if (!comment) throw new RequestError("Comment not found", 404)
    
    await suspendComment(params, comment)
}

async function unsuspendCommentById(id) {
    const comment = await db.comment.findByPk(id)
    if (!comment) throw new RequestError("Comment not found", 404)

    await unsuspendComment(comment)
}

async function suspendPostById(params) {
    const post = await db.post.findByPk(params.postId)
    if (!post) throw new RequestError("Post not found", 404)

    await suspendPost(params, post)
}

async function unsuspendPostById(id) {
    const post = await db.post.findByPk(id)
    if (!post) throw new RequestError("Post not found", 404)

    await unsuspendPost(post)
}

async function suspendUserById(params) {
    const user = await db.user.findOne({
        where: { id: params.userId },
        include: [{
            model: db.post,
            required: true
        }]
    })
    if (!user) throw new RequestError("User not found", 404)
    if (user.role == roles.Admin) throw new RequestError("Cannot suspend admins", 400)

    await suspendUser(params, user)
}

async function unsuspendUserById(id) {
    const user = await db.user.findByPk(id)
    if (!user) throw new RequestError("User not found", 404)

    await unsuspendUser(user)
}

async function suspendComment(params, comment) {
    if (comment.isSuspended) return
    const suspension = new db.commentSuspension(params)
    await suspension.save()

    comment.isSuspended = true
    comment.updatedAt = Date.now()
    await comment.save()
}

async function unsuspendComment(comment) {
    const suspension = await db.commentSuspension.findOne({
        where: { commentId: comment.id, isValid: true }
    })
    if (suspension) {
        suspension.isValid = false
        suspension.updatedAt = Date.now()
        await suspension.save()
    }

    comment.isSuspended = false
    comment.updatedAt = Date.now()
    await comment.save()
}

async function suspendPost(params, post) {
    if (post.isSuspended) return
    const suspension = new db.postSuspension(params)
    await suspension.save()

    post.isSuspended = true
    post.updatedAt = Date.now()
    await post.save()
}

async function unsuspendPost(post) {
    const suspension = await db.postSuspension.findOne({
        where: { postId: post.id, isValid: true }
    })
    if (suspension) {
        suspension.isValid = false
        suspension.updatedAt = Date.now()
        await suspension.save()
    }

    post.isSuspended = false
    post.updatedAt = Date.now()
    await post.save()
}

async function suspendUser(params, user) {
    if (user.isSuspended) return
    const suspension = new db.userSuspension(params)
    await suspension.save()

    user.isSuspended = true
    user.updatedAt = Date.now()
    await user.save()

    const { reason, adminId } = params
    user.posts.forEach(async post => {
        await suspendPost({ reason, userId: adminId, postId: post.id }, post)
    })
}

async function unsuspendUser(user) {
    const suspension = await db.userSuspension.findOne({
        where: { userId: user.id, isValid: true }
    })
    if (suspension) {
        suspension.isValid = false
        suspension.updatedAt = Date.now()
        await suspension.save()
    }

    user.isSuspended = false
    user.updatedAt = Date.now()
    await user.save()
}

async function getAllSuspensions() {
    const userSuspensions = await db.user.findAll({
        where: { isSuspended: true },
        include: [{
            model: db.userSuspension,
            required: true,
            attributes: ['reason', 'validUntil', 'createdAt', 'adminId'],
            where: { isValid: true },
            include: [{
                model: db.user,
                as: 'admin',
                required: true,
                attributes: ['username', 'firstName', 'lastName', 'createdAt']
            }]
        }]
    })

    const postSuspensions = await db.post.findAll({
        where: { isSuspended: true },
        include: [{
            model: db.postSuspension,
            required: true,
            attributes: ['reason', 'createdAt', 'userId'],
            where: { isValid: true },
            include: [{
                model: db.user,
                required: true,
                attributes: ['username', 'firstName', 'lastName', 'createdAt']
            }]
        }]
    })

    const commentSuspensions = await db.comment.findAll({
        where: { isSuspended: true },
        include: [{
            model: db.commentSuspension,
            required: true,
            attributes: ['reason', 'createdAt', 'userId'],
            where: { isValid: true },
            include: [{
                model: db.user,
                required: true,
                attributes: ['username', 'firstName', 'lastName', 'createdAt']
            }]
        }]
    })
    
    return { users: userSuspensions, posts: postSuspensions, comments: commentSuspensions }
}
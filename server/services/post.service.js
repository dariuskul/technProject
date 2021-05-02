const db = require('../_helpers/db.js')
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    updatePost
}

async function createPost(params) {
    await db.post.create(params)
}

async function getAllPosts() {
    const posts = await db.post.findAll()
    return posts
}

async function getPostById(id) {
    const post = await db.post.findByPk(id)
    if (!post) throw 'Post not found'
    return post
}

async function deletePost(id) {
    const post = await getPostById(id)
    await post.destroy()
}

async function updatePost(id, params) {
    const post = await getPostById(id)
    Object.assign(post, params)
    post.updated = Date.now()
    await post.save()
    return post.get()
}
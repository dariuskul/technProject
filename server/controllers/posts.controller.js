const express = require('express')
const router = express.Router()
const postService = require('../services/post.service')
const Joi = require('Joi')
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
const roles = require('../_helpers/roles')
router.post('/create', createSchema, create)
router.post('/hide/:id', authorize(), changeVisibility)
router.post('/comment', authorize(), commentSchema, createComment)
router.post('/postReact', authorize(), postReactSchema, createPostReact)
router.post('/commentReact', authorize(), commentReactSchema, createCommentReact)
router.get('/getAll', getAll)
router.get('/getById/:id', getById)
router.get('/getByUser/:id', getByUser)
router.get('/getByTitle', getByTitle)
router.get('/comments/:id', getComments)
router.put('/update/:id', authorize(), updateSchema, update)
router.delete('/delete/:id', authorize(), _delete)
router.delete('/commentReact/:id', authorize(), deleteCommentReact)
router.delete('/postReact/:id', authorize(), deletePostReact)
module.exports = router

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(256),
        description: Joi.string().required().min(3),
        photoUrl: Joi.string().required(),
        content: Joi.string().required().min(3),
        userId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

//TODO maybe get id from token, not body
function create(req, res, next) {
    postService.createPost(req.body)
        .then(() => res.json({ message: 'Post created successfully'}))
        .catch(error => res.status(400).json({ message: error }))
}

function getAll(req, res, next) {
    postService.getAllPosts()
        .then(posts => res.json({ posts }))
        .catch(error => res.status(500).json({ message: error }))
}

function getById(req, res, next) {
    postService.getPostById(req.params.id)
        .then(post => res.json({ ...post.get() }))
        .catch(error => res.status(404).json({ message: error }))
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(256),
        description: Joi.string().min(3),
        photoUrl: Joi.string(),
        content: Joi.string().min(3)
    })

    validateRequest(req, res, next, schema)
}

function update(req, res, next) {
    postService.updatePost(req.params.id, req.body, req.user.id)
        .then(post => res.json({ ...post }))
        .catch(error => res.status(404).json({ message: error }))
}

function _delete(req, res, next) {
    postService.deletePost(req.params.id, req.user)
        .then(() => res.json({ message: 'Post removed'}))
        .catch(error => res.status(404).json({ message: error }))
}

function getByUser(req, res, next) {
    postService.getPostsByUser(req.params.id)
        .then(posts => res.json({ posts }))
        .catch(error => res.status(500).json({ message: error }))
}

function changeVisibility(req, res, next) {
    postService.changePostVisibility(req.params.id, req.user.id)
        .then(status => res.json({ message: status? 'Post was hidden' : 'Post was unhidden' }))
        .catch(error => res.status(404).json({ message: error }))
}

function getByTitle(req, res, next) {
    postService.getPostsByTitle(req.query)
        .then(posts => res.json({ posts }))
        .catch(error => res.status(500).json({ message: error }))
}

function commentSchema(req, res, next) {
    const schema = Joi.object({
        content: Joi.string().required(),
        postId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

function createComment(req, res, next) {
    postService.createComment(req.body, req.user.id)
        .then(() => res.json({ message: 'Comment created' }))
        .catch(error => res.status(400).json({ message: error }))
}

function getComments(req, res, next) {
    postService.getAllComments(req.params.id)
        .then(comments => res.json({ comments }))
        .catch(error => res.status(500).json({ message: error }))
}

function postReactSchema(req, res, next) {
    const schema = Joi.object({
        reaction: Joi.string().required().valid('Smile', 'Like', 'Heart', 'Laugh', 'Surprised'),
        postId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

function createPostReact(req, res, next) {
    postService.createPostReact(req.body, req.user.id)
        .then(() => res.json({ message: 'React added to post' }))
        .catch(error => res.status(400).json({ message: error }))
}

function deletePostReact(req, res, next) {
    postService.deletePostReactById(req.params.id, req.user.id)
        .then(() => res.json({ message: 'React removed from post.' }))
        .catch(error => res.status(404).json({ message: error }))
}

function commentReactSchema(req, res, next) {
    const schema = Joi.object({
        reaction: Joi.string().required().valid('Smile', 'Like', 'Heart', 'Laugh', 'Surprised'),
        commentId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

function createCommentReact(req, res, next) {
    postService.createCommentReact(req.body, req.user.id)
        .then(() => res.json({ message: 'React added to comment' }))
        .catch(error => res.status(400).json({ message: error }))
}

function deleteCommentReact(req, res, next) {
    postService.deleteCommentReactById(req.params.id, req.user.id)
        .then(() => res.json({ message: 'React removed from comment.' }))
        .catch(error => res.status(404).json({ message: error }))
}
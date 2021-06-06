const express = require('express')
const router = express.Router()
const postService = require('../services/post.service')
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
const roles = require('../_helpers/roles')
const { handleError } = require('../_helpers/request-error')
router.post('/create', authorize(), createSchema, create)
router.post('/comment', authorize(), commentSchema, createComment)
router.post('/postReact', authorize(), postReactSchema, createPostReact)
router.post('/commentReact', authorize(), commentReactSchema, createCommentReact)
router.get('/getAll', getAll)
router.get('/getById/:id', getById)
router.get('/getByUser/:id', authorize([], false), getByUser)
router.get('/getBySearch', getBySearch)
router.get('/comments/:id', getComments)
router.put('/update/:id', authorize(), updateSchema, update)
router.put('/hide/:id', authorize(), changeVisibility)
router.delete('/delete/:id', authorize(), _delete)
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
        .then(post => res.json({ post, message: 'Post created successfully'}))
        .catch(error => handleError(error, res))
}

function getAll(req, res, next) {
    postService.getAllPosts(req.query)
        .then(posts => res.json({ posts }))
        .catch(error => handleError(error, res))
}

function getById(req, res, next) {
    postService.getPostById(req.params.id)
        .then(postData => {
            const { post, comments, reacts } = postData
            return res.json({ ...post.get(), comments, reacts })
        })
        .catch(error => handleError(error, res))
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
        .catch(error => handleError(error, res))
}

function _delete(req, res, next) {
    postService.deletePost(req.params.id, req.user)
        .then(() => res.json({ message: 'Post removed'}))
        .catch(error => handleError(error, res))
}

function getByUser(req, res, next) {
    const loggedInId = req.user? req.user.id : null
    postService.getPostsByUser(req.params.id, loggedInId, req.query)
        .then(posts => res.json({ posts }))
        .catch(error => handleError(error, res))
}

//TODO Get data from token
function changeVisibility(req, res, next) {
    postService.changePostVisibility(req.params.id, req.user.id)
        .then(post => res.json({ ...post }))
        .catch(error => handleError(error, res))
}

function getBySearch(req, res, next) {
    postService.getPostsBySearch(req.query)
        .then(posts => res.json({ posts }))
        .catch(error => handleError(error, res))
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
        .then(comment => res.json({ comment, message: 'Comment created' }))
        .catch(error => handleError(error, res))
}

function getComments(req, res, next) {
    postService.getAllComments(req.params.id, req.query)
        .then(comments => res.json({ comments }))
        .catch(error => handleError(error, res))
}

function postReactSchema(req, res, next) {
    const schema = Joi.object({
        reaction: Joi.string().required().valid('Smile', 'Like', 'Heart', 'Laugh', 'Surprised'),
        postId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

function createPostReact(req, res, next) {
    postService.reactToPost(req.body, req.user.id)
        .then(react => res.json({ ...react }))
        .catch(error => handleError(error, res))
}

function commentReactSchema(req, res, next) {
    const schema = Joi.object({
        reaction: Joi.string().required().valid('Smile', 'Like', 'Heart', 'Laugh', 'Surprised'),
        commentId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

function createCommentReact(req, res, next) {
    postService.reactToComment(req.body, req.user.id)
        .then(react => res.json({ ...react }))
        .catch(error => handleError(error, res))
}
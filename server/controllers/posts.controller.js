const express = require('express')
const router = express.Router()
const postService = require('../services/post.service')
const Joi = require('Joi')
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
router.post('/create', createSchema, create)
router.get('/getAll', getAll)
router.get('/getById/:id', getById)
router.put('/update/:id', updateSchema, update)
router.delete('/delete/:id', _delete)
module.exports = router

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(256),
        description: Joi.string().required().min(3),
        photoUrl: Joi.string().required(),
        content: Joi.string().required().min(3),
        isSuspended: Joi.boolean().required(),
        userId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

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
    postService.updatePost(req.params.id, req.body)
        .then(post => res.json({ ...post }))
        .catch(error => res.status(404).json({ message: error }))
}

function _delete(req, res, next) {
    postService.deletePost(req.params.id)
        .then(() => res.json({ message: 'Post removed'}))
        .catch(error => res.status(404).json({ message: error }))
}
const express = require('express')
const router = express.Router()
const adminService = require('../services/admin.service')
const Joi = require('Joi')
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
const roles = require('../_helpers/roles')
const { handleError } = require('../_helpers/request-error')
// router.post('/user', suspendUser)
router.post('/suspend/comment', authorize(roles.Admin), commentSuspensionSchema, suspendComment)
router.post('/suspend/post', authorize(roles.Admin), postSuspensionSchema, suspendPost)
router.post('/suspend/user', authorize(roles.Admin), userSuspensionSchema, suspendUser)
router.put('/unsuspend/comment/:id', authorize(roles.Admin), unsuspendComment)
router.put('/unsuspend/post/:id', authorize(roles.Admin), unsuspendPost)
router.put('/unsuspend/user/:id', authorize(roles.Admin), unsuspendUser)
router.get('/suspensions', authorize(roles.Admin), getAll)
router.get('/suspensions/user', authorize(roles.Admin), getAllUser)
router.get('/suspensions/post', authorize(roles.Admin), getAllPost)
router.get('/suspensions/comment', authorize(roles.Admin), getAllComment)
module.exports = router

function getAll(req, res, next) {
    adminService.getAllSuspensions()
        .then(suspensions => res.json(suspensions))
        .catch(error => handleError(error, res))
}

function getAllUser(req, res, next) {
    adminService.getAllUserSuspensions()
        .then(suspensions => res.json(suspensions))
        .catch(error => handleError(error, res))
}

function getAllPost(req, res, next) {
    adminService.getAllPostSuspensions()
        .then(suspensions => res.json(suspensions))
        .catch(error => handleError(error, res))
}

function getAllComment(req, res, next) {
    adminService.getAllCommentSuspensions()
        .then(suspensions => res.json(suspensions))
        .catch(error => handleError(error, res))
}

function userSuspensionSchema(req, res, next) {
    const schema = Joi.object({
        reason: Joi.string().required().valid('Fraud', 'Inappropriate', 'Violence', 'Spam', 'Hate speech'),
        userId: Joi.number().required(),
        validUntil: Joi.date()
    })

    validateRequest(req, res, next, schema)
}

//TODO Add admin only and filtering
function suspendUser(req, res, next) {
    adminService.suspendUserById({ ...req.body, adminId: req.user.id })
        .then(() => res.json({ message: 'User suspended' }))
        .catch(error => handleError(error, res))
}

function unsuspendUser(req, res, next) {
    adminService.unsuspendUserById(req.params.id)
        .then(() => res.json({ message: 'User unsuspended' }))
        .catch(error => handleError(error, res))
}

function postSuspensionSchema(req, res, next) {
    const schema = Joi.object({
        reason: Joi.string().required().valid('Fraud', 'Inappropriate', 'Violence', 'Spam', 'Hate speech'),
        postId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

function suspendPost(req, res, next) {
    adminService.suspendPostById({ ...req.body, userId: req.user.id })
        .then(() => res.json({ message: 'Post suspended'}))
        .catch(error => handleError(error, res))
}

function unsuspendPost(req, res, next) {
    adminService.unsuspendPostById(req.params.id)
        .then(() => res.json({ message: 'Post unsuspended' }))
        .catch(error => handleError(error, res))
}

function commentSuspensionSchema(req, res, next) {
    const schema = Joi.object({
        reason: Joi.string().required().valid('Fraud', 'Inappropriate', 'Violence', 'Spam', 'Hate speech'),
        commentId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

function suspendComment(req, res, next) {
    adminService.suspendCommentById({ ...req.body, userId: req.user.id })
        .then(() => res.json({ message: 'Comment suspended' }))
        .catch(error => handleError(error, res))
}

function unsuspendComment(req, res, next) {
    adminService.unsuspendCommentById(req.params.id)
        .then(() => res.json({ message: 'Comment unsuspended' }))
        .catch(error => handleError(error, res))
}
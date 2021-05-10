const express = require('express')
const router = express.Router()
const userService = require('../services/user.service')
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
const roles = require('../_helpers/roles')
const { handleError } = require('../_helpers/request-error')
router.post('/register', registerSchema,register)
router.post('/login', loginSchema, login)
router.put('/update/:id', authorize(), updateSchema, update)
router.delete('/delete/:id', authorize(roles.Admin), _delete)
router.get('/getAll', authorize(roles.Admin), getAll)
router.get('/getById/:id', authorize(), getById)
module.exports = router

//TODO Add more validation parameters with custom messages, add email
function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required().min(3).max(32),
        lastName: Joi.string().required().min(3).max(32),
        username: Joi.string().required().min(3).max(32),
        password: Joi.string().required().min(6).max(32),
        dateOfBirth: Joi.date().required()
    });
    validateRequest(req, res, next, schema);
}
function register(req, res, next) {
    userService.register(req.body)
        .then(()=> res.json({ message: 'Registration successful'} ))
        .catch(error => handleError(error, res))
}

function loginSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, res, next, schema);
}

function login(req, res, next) {
    userService.login(req.body)
        .then(user => res.json(user))
        .catch(error => handleError(error, res))
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(32).empty(''),
        lastName: Joi.string().min(3).max(32).empty(''),
        username: Joi.string().min(3).max(32).empty(''),
        password: Joi.string().min(6).max(32).empty(''),
        dateOfBirth: Joi.date()
    })
    validateRequest(req, res, next, schema)
}

function update(req, res, next) {
    if (Number(req.params.id) != req.user.id)
        return res.status(403).json({ message: "Forbidden, must be a user with same id"})

    userService.update(req.params.id, req.body)
        .then(user => res.json({ ...user }))
        .catch(error => res.status(error.statusCode? error.statusCode : 500)
                            .json({  message: error.message }))
}

function _delete(req, res, next) {
    userService.deleteUser(req.params.id)
        .then(() => res.json({ message: 'User removed' }))
        .catch(error => handleError(error, res))
}

function getAll(req, res, next) {
    userService.getAllUsers()
        .then(users => res.json({ users }))
        .catch(error => handleError(error, res))
}

function getById(req, res, next) {
    if (Number(req.params.id) != req.user.id && req.user.role != roles.Admin)
        return res.status(403).json({ message: "Forbidden, must be a user with same id or admin"})

    userService.getUserById(req.params.id)
        .then(user => res.json({ ...user }))
        .catch(error => handleError(error, res))
}
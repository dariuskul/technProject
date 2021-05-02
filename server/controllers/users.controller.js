const express = require('express')
const router = express.Router()
const userService = require('../services/user.service')
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
router.post('/register', registerSchema,register)
router.post('/login', loginSchema, login)
router.put('/update/:id', updateSchema, update)
router.delete('/delete/:id', _delete)
router.get('/getAll', getAll)
router.get('/getById/:id', getById)
module.exports = router

//TODO Add more validation parameters with custom messages, add email
function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required().min(3).max(32),
        lastName: Joi.string().required().min(3).max(32),
        username: Joi.string().required().min(3).max(32),
        password: Joi.string().required().min(6).max(32),
        dateOfBirth: Joi.date().required(),
        role: Joi.string().required(),
        isSuspended: Joi.boolean().required()
    });
    validateRequest(req, res, next, schema);
}
function register(req, res, next) {
    userService.register(req.body)
        .then(()=> res.json({ message: 'Registration successful'} ))
        .catch(error => res.status(400).json({ message: error }))
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
        .catch(error => res.status(401).json({ message: error }));
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

//TODO add auth
function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json({ ...user }))
        .catch(error => res.status(400).json({  message: error }))
}

//TODO Check if admin
function _delete(req, res, next) {
    userService.deleteUser(req.params.id)
        .then(() => res.json({ message: 'User removed' }))
        .catch(error => res.status(404).json({ message: error }))
}

//TODO Check if admin
function getAll(req, res, next) {
    userService.getAllUsers()
        .then(users => res.json({ users }))
        .catch(error => res.status(500).json({ message: error }))
}

//TODO check if admin or user
function getById(req, res, next) {
    userService.getUserById(req.params.id)
        .then(user => res.json({ ...user.get() }))
        .catch(error => res.status(404).json({ message: error }))
}
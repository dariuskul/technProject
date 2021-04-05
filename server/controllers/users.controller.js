const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request')
router.post('/register',registerSchema,register)
module.exports = router

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        dateOfBirth: Joi.date().required(),
        role: Joi.string().required(),
        isSuspended: Joi.boolean().required()
    });
    validateRequest(req, next, schema);
}
function register(req,res,next){
    console.log("Register body:", req.body)
    userService.register(req.body).then(()=> res.json({message: 'Registration successful'})).catch(next)
}
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const { handleError } = require('../_helpers/request-error')
const outerService = require('../services/outer.service')
router.get('/tweets', getTweets)
module.exports = router

function getTweets(req, res, next) {
    outerService.getTweetsByTitle(req.query)
        .then(response => res.json({ ...response.data }))
        .catch(error => handleError(error, res))
}
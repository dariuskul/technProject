const express = require('express')
const router = express.Router()
const communicationService = require('../services/communication.service')
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
const { handleError } = require('../_helpers/request-error')
router.post('/follow', authorize(), followSchema, follow)
router.delete('/unfollow/:id', authorize(), unfollow)
router.get('/follows/:id', authorize(), getAllFollowed)
module.exports = router


function followSchema(req, res, next) {
    const schema = Joi.object({
        followeeId: Joi.number().required()
    })

    validateRequest(req, res, next, schema)
}

function follow(req, res, next) {
    communicationService.followUser({ ...req.body, userId: req.user.id })
        .then(follow => res.json(follow))
        .catch(error => handleError(error, res))
}

function unfollow(req, res, next) {
    communicationService.unfollowUser(req.params.id)
        .then(() => res.json({ message: "User unfollowed" }))
        .catch(error => handleError(error, res))
}

function getAllFollowed(req, res, next) {
    if (Number(req.params.id) != req.user.id)
        return res.status(403).json({ message: "Forbidden, token and provided user ids do not match"})
    
    communicationService.getAllFollowedUsers(req.params.id)
        .then(follows => res.json(follows))
        .catch(error => handleError(error, res))
}


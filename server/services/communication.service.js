const db = require('../_helpers/db')
const { RequestError } = require('../_helpers/request-error')
const { getUserById } = require('../services/user.service')

module.exports = {
    followUser,
    unfollowUser,
    getAllFollowedUsers
}

async function followUser(params) {
    const existingFollow = await db.followedUser.findOne({ where: { followeeId: params.followeeId } })
    if (existingFollow) throw new RequestError("User already followed", 400)

    const { id, ...rest} = await getUserById(params.followeeId)
    const follow = new db.followedUser(params)
    await follow.save()
    
    return { id: follow.id, userId: id, ...rest, followingSince: follow.createdAt }
}

async function unfollowUser(followId) {
    const follow = await db.followedUser.findOne({ where: { id: followId } })
    if (!follow) throw new RequestError("Follow record not found", 404)

    await follow.destroy()
}

async function getAllFollowedUsers(userId) {
    var follows = await db.followedUser.findAll({
        where: { userId },
        attributes: ['id', 'createdAt'],
        include: [{
            model: db.user,
            as: 'followee',
            required: true,
            attributes: ['username', 'firstName', 'lastName'],
            where: { isSuspended: false }
        }]
     })
     follows = follows.map(follow => {
         const { followee, ...rest } = follow.get({ plain: true })
         return { ...rest, ...followee }
     })

     return follows
}
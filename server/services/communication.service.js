const db = require('../_helpers/db')
const { RequestError } = require('../_helpers/request-error')
const { getUserById } = require('../services/user.service')

module.exports = {
    followUser,
    getAllFollowedUsers,
    getChatHistory,
    addMessage,
    muteUserById,
    findMutedUser
}

async function followUser({ followeeId, userId }) {
    const existingFollow = await db.followedUser.findOne({ where: { userId, followeeId } })
    if (!existingFollow) {
        const { id, ...rest} = await getUserById(followeeId)
        const follow = new db.followedUser({ followeeId, userId })
        await follow.save()
        
        return { id: follow.id, userId: id, ...rest, followingSince: follow.createdAt }
    }
    else {
        await existingFollow.destroy()
        return null
    }
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

async function getChatHistory({ user1Id, user2Id, page = 0, per_page = 100 }) {
    const chat = await db.chat.findOne({ user1Id, user2Id })
    if (!chat) return []

    const messages = await db.message.findAll({
        where: { 
            chatId: chat.id,
            id: { $gt: per_page * page, $lt: per_page * (page + 1) }
         },
        order: 'createdAt desc'
    })
    return messages
}

async function addMessage({ user1Id, user2Id, content }) {
    var chat = await db.chat.findOne({ where: { user1Id, user2Id } })

    if (!chat) {
        chat = new db.chat({ user1Id, user2Id })
        await chat.save()
    }

    const message = new db.message({
        content,
        senderId: user1Id,
        chatId: chat.id
    })
    await message.save()
    return message
}

async function muteUserById(mutedId, userId) {
    const mutedUser = await findMutedUser(mutedId, userId)

    if (!mutedUser) {
        const muteRecord = new db.mutedUser({ mutedId, userId })
        await muteRecord.save()
        return "User is now muted"
    }
    else {
        await mutedUser.destroy()
        return "User is no longer muted"
    }
}

async function findMutedUser(mutedId, userId) {
    const mutedUser = await db.mutedUser.findOne({ where: { mutedId, userId } })
    return mutedUser
}
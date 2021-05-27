const db = require('../_helpers/db')
const { RequestError } = require('../_helpers/request-error')
const { getUserById } = require('../services/user.service')
const { Op } = require('sequelize')

module.exports = {
    followUser,
    getAllFollowedUsers,
    getMessages,
    addMessage,
    muteUserById,
    findMutedUser,
    getChatsByUser
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

async function getAllFollowedUsers(userId, { page = '0', count = '10' }) {
    const perPage = parseInt(count)
    var follows = await db.followedUser.findAll({
        limit: perPage,
        offset: parseInt(page) * perPage,
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

async function getMessages({ user1Id, user2Id, page = '0', count = '20' }) {
    const chatParams = user1Id > user2Id? { user1Id: user2Id, user2Id: user1Id } :
                        { user1Id, user2Id }
    const chat = await db.chat.findOne({ where: chatParams })
    if (!chat) return []

    const perPage = parseInt(count)
    const messages = await db.message.findAll({
        limit: perPage,
        offset: parseInt(page) & perPage,
        where: { 
            chatId: chat.id
         },
        order: [['createdAt', 'DESC']]
    })
    return messages
}

async function addMessage({ user1Id, user2Id, content }) {
    const mutedUser = await findMutedUser(user1Id, user2Id)
    if (mutedUser) throw new RequestError("The user has muted you.", 400)

    const chatParams = user1Id > user2Id? { user1Id: user2Id, user2Id: user1Id } :
                            { user1Id, user2Id }
    var chat = await db.chat.findOne({ where: chatParams })

    if (!chat) {
        chat = new db.chat(chatParams)
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

async function getChatsByUser(userId, { page = '0', count = '10' }) {
    const perPage = parseInt(count)
    const chats = await db.chat.findAll({ 
        limit: perPage,
        offset: parseInt(page) * perPage,
        where: {
            [Op.or]: [
                { user1Id: userId },
                { user2Id: userId }
            ]
        } })

     return chats
}
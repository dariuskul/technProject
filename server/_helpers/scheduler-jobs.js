const { Op } = require('sequelize')
const schedule = require('node-schedule')

module.exports = {
    initiateUnsuspendJobs
}

async function initiateUnsuspendJobs(db) {
    const userSuspensions = await db.userSuspension.findAll({ 
        where: {
            validUntil: { [Op.ne]: null },
            isValid: 1
        }
     })

     userSuspensions.forEach(suspension => {
         if (suspension.validUntil > Date.now()) {
            const unsuspendDate = new Date(suspension.validUntil)
            schedule.scheduleJob(`unsuspend ${suspension.userId}`, unsuspendDate, function() {
                unsuspendJob(db, suspension)
            })
         }
         else {
             unsuspendJob(db, suspension)
         }
     })
}

async function unsuspendJob(db, suspension) {
    const user = await db.user.findByPk(suspension.userId)
    if (!user) throw Error("User not found during unsuspend job")
    if (!user.isSuspended) return

    user.isSuspended = false
    user.updatedAt = Date.now()
    await user.save()

    suspension.isValid = false
    suspension.updatedAt = Date.now()
    await suspension.save()
}
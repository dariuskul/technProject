const { DataTypes } = require('sequelize')
const reasons = require('../_helpers/suspension-reasons')

module.exports = model;

function model(sequelize){
    const attributes = {
        reason: { type: DataTypes.ENUM([Object.values(reasons)]), allowNull: false },
        isValid: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
        validUntil: { type: DataTypes.DATE, defaultValue: null, allowNull: true }
    }

    return sequelize.define('user_suspension', attributes)
}
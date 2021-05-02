const { DataTypes } = require('sequelize')

module.exports = model;

function model(sequelize) {
    const attributes = {
        content: { type: DataTypes.STRING, allowNull: false },
        isSuspended: { type: DataTypes.BOOLEAN, default: false, allowNull: false }
    }

    return sequelize.define('comment', attributes)
}
const { DataTypes } = require('sequelize')

module.exports = model

function model(sequelize) {
    const attributes = {
        content: { type: DataTypes.STRING, allowNull: false }
    }

    return sequelize.define('message', attributes)
}
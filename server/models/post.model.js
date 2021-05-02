const { DataTypes } = require('sequelize')

module.exports = model;

function model(sequelize){
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        photoUrl: { type: DataTypes.TEXT, allowNull: true },
        content: { type: DataTypes.STRING, allowNull: false },
        isSuspended: { type: DataTypes.BOOLEAN, default: false, allowNull: false }
    }

    return sequelize.define('post', attributes)
}
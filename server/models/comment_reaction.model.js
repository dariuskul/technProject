const { DataTypes } = require('sequelize')
const reactions = require('../_helpers/reactions')

module.exports = model;

function model(sequelize) {
    const attributes = {
        reaction: { type: DataTypes.ENUM([Object.keys(reactions)]), 
                    allowNull: false }
    }

    return sequelize.define('comment_reaction', attributes)
}
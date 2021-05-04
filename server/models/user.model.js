const {DataTypes} = require('sequelize')

module.exports = model;

function model(sequelize){
    const attributes= {
        username: {type: DataTypes.STRING, allowNull: false},
        passwordHash: {type: DataTypes.STRING, allowNull: false},
        firstName: {type: DataTypes.STRING, allowNull: false},
        lastName: {type: DataTypes.STRING, allowNull: false},
        dateOfBirth: {type: DataTypes.DATE, allowNull: false},
        role: {type: DataTypes.STRING, defaultValue: "User", allowNull: false},
        isSuspended: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}
    };

    const options ={
        defaultScope: {
            attributes: {exclude: ['passwordHash']}
        },
        scopes:{
            withHash: {attributes: {},}
        }
    }

    return sequelize.define('user',attributes,options)
}
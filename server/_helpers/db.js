const config = require('../config.json');
const mysql = require('mysql');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize(){
    const { host, port, user, password, database } = config.database

    const connection = await mysql.createConnection({ host, port, user, password })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' })

    //Create tables
    db.user = require('../models/user.model')(sequelize)
    db.post = require('../models/post.model')(sequelize)
    db.comment = require('../models/comment.model')(sequelize)
    db.postReact = require('../models/post_reaction')(sequelize)
    db.commentReact = require('../models/comment_reaction.model')(sequelize)

    //Table relationships
    db.user.hasMany(db.post)
    db.user.hasMany(db.comment)
    db.user.hasMany(db.commentReact)
    db.user.hasMany(db.postReact)
    db.post.belongsTo(db.user)
    db.post.hasMany(db.comment)
    db.post.hasMany(db.postReact)
    db.comment.belongsTo(db.post)
    db.comment.belongsTo(db.user)
    db.comment.hasMany(db.commentReact)
    db.commentReact.belongsTo(db.comment)
    db.commentReact.belongsTo(db.user)
    db.postReact.belongsTo(db.post)
    db.postReact.belongsTo(db.user)

    await sequelize.sync();
}
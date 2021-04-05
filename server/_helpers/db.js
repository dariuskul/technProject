const config = require('../config.json');
const mysql = require('mysql');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize(){
    const { host, port, user, password, database } = config.database;

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    db.user = require('../models/user.model')(sequelize);
    await sequelize.sync();
}
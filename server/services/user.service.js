const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../_helpers/db.js')
module.exports = {
    register,
    login,
    update,
    _delete,
    getAll,
    getById
}
async function register(params){
    console.log(params)
    if(await db.user.findOne({ where: { username: params.username}}))
        throw 'Provided username is already taken'
    // if (await db.user.findOne({ where: { email: params.email } }))
    //     throw 'Provided email is already taken'
    if(params.password)
        params.passwordHash = await bcrypt.hash(params.password, 10);

    await db.user.create(params)
}

async function login({username, password}){
    const user = await db.user.scope('withHash').findOne({where: {username}});

    if(!user || !(await bcrypt.compare(password,user.passwordHash))){
        throw 'Invalid credentials';
    }

    const token = jwt.sign({sub: user.id},config.secret, {expiresIn: '1d'});
    return {...omitHash(user.get()), token};
}

async function update(id, params) {
    const user = await getById(id)
    if (params.username && user.username != params.username && await db.user.findOne({ where: { username: params.username } }))
        throw 'Username ' + params.username + ' is already taken'
    if (params.email && user.email !== params.email && await db.user.findOne({ where: { email: params.email } }))
        throw 'Email ' + params.email + ' is already taken'

    if (params.password)
        params.passwordHash = await bcrypt.hash(params.password, 10)
    Object.assign(user, params)
    user.updated = Date.now()
    await user.save()

    return { ...omitHash(user.get()) }
}

async function _delete(id) {
    const user = await getById(id)
    await user.destroy()
}

async function getAll() {
    const users = await db.user.findAll()
    return users
}

async function getById(id) {
    const user = await db.user.scope('withHash').findByPk(id)
    if (!user) throw 'User not found'
    return user
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
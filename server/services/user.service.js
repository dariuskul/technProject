const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../_helpers/db.js')
module.exports = {
    register,
    login
}
async function register(params){
    console.log(params)
    if(await db.user.findOne({ where: { username: params.username}})){
        throw "Provided username is already taken";
    }

    if(params.password){
        params.passwordHash = await bcrypt.hash(params.password,10);
    }

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

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
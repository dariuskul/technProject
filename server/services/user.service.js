const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../_helpers/db.js");
module.exports = {
  register,
  login,
  update,
  deleteUser,
  getAllUsers,
  getUserById,
};

async function register(params) {
  console.log(params);
  if (await db.user.findOne({ where: { username: params.username } }))
    throw new Error("Provided username is already taken");
  // if (await db.user.findOne({ where: { email: params.email } }))
  //     throw 'Provided email is already taken'
  if (params.password)
    params.passwordHash = await bcrypt.hash(params.password, 10);

  await db.user.create(params);
}

async function login({ username, password }) {
  const user = await db.user.scope("withHash").findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw "Credentials Invalid";
  }

  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "1d" });
  return { ...omitHash(user.get()), token };
}

async function update(id, params) {
  const user = await getUserById(id);
  if (
    params.username &&
    user.username != params.username &&
    (await db.user.findOne({ where: { username: params.username } }))
  )
    throw "Username " + params.username + " is already taken";
  if (
    params.email &&
    user.email !== params.email &&
    (await db.user.findOne({ where: { email: params.email } }))
  )
    throw "Email " + params.email + " is already taken";

  if (params.password)
    params.passwordHash = await bcrypt.hash(params.password, 10);
  Object.assign(user, params);
  user.updated = Date.now();
  await user.save();

  return { ...omitHash(user.get()) };
}

//TODO use postService to delete posts and other post relationships...
async function deleteUser(id) {
  const user = await getUserById(id);
  await db.post.destroy({ where: { userId: id } });
  await user.destroy();
}

async function getAllUsers() {
  const users = await db.user.findAll();
  return users;
}

async function getUserById(id) {
  const user = await db.user.scope("withHash").findByPk(id);
  if (!user) throw "User not found";
  return { ...omitHash(user.get()) };
}

function omitHash(user) {
  const { passwordHash, ...userWithoutHash } = user;
  return userWithoutHash;
}

import MongoDb from 'mongodb';
import { getUsers } from '../db/database.js';
const ObjectId = MongoDb.ObjectId;

// 유저이름 중복검사
export async function findByUsername(username) {
  return getUsers().find({ username }).next().then(mapOptionalUser);
}

// id 중복검사
export async function findById(id) {
  return getUsers()
    .find({ _id: new ObjectId(id) })
    .next()
    .then(mapOptionalUser);
}

// 회원가입
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
  // .ops[0]._id.toString()
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}

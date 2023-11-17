// import { db } from '../db/database.js'; mysql
import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

const userShema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userShema);
const User = Mongoose.model('User', userShema); // 자동으로 s가 붙음 컬렉션이 만들어진다

// 유저이름 중복검사
export async function findByUsername(username) {
  return User.findOne({ username });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id); // data.id 는 버추얼 아이디
}

// mysql
// // 유저이름 중복검사
// export async function findByUsername(username) {
//   return db.execute('SELECT * FROM users WHERE username = ?', [username]).then((result) => {
//     return result[0][0];
//   });
// }

// // id 중복검사
// export async function findById(id) {
//   return db.execute('SELECT * FROM users WHERE id = ?', [id]).then((result) => {
//     return result[0][0];
//   });
// }

// // 회원가입
// export async function createUser(user) {
//   const { username, password, name, email, url } = user;
//   return db
//     .execute('INSERT INTO users(username, password,  name, email, url) values(?,?,?,?,?)', [
//       username,
//       password,
//       name,
//       email,
//       url,
//     ])
//     .then((result) => result[0].insertId);
// }

// import mysql from 'mysql2';
import Mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema) {
  schema.virtual('id').get(function () {
    // 아이디라는 항목이 생김 실제 저장소는 X
    return this._id.toString();
  });
  schema.set('toJSON', { virtual: true }); // 메모리에 저장되는 가상으로 존재하는 메서드
  schema.set('toObject', { virtual: true }); //메모리에 저장되는 가상으로 존재하는 메서드
}

let db;

export function getTweets() {
  return db.collection('tweets');
}

// mySql
// const pool = mysql.createPool({
//   host: config.db.host,
//   user: config.db.user,
//   database: config.db.database,
//   password: config.db.password,
// });

// export const db = pool.promise(); // promise형태로 변형해서 import then..등등 사용 가능

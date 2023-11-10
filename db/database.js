import mysql from 'mysql2';
import {config} from '../config.js';

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password
});

export const db = pool.promise(); // promise형태로 변형해서 import then..등등 사용 가능
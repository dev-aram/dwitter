import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import tweetRouter from './router/tweets.js';
import authRouter from './router/auth.js';
// import dotenv from 'dotenv'; config.js로 이동
import { config } from './config.js';
// dotenv.config(); config.js로 이동
import { initSocket } from './connection/socket.js';
// import { db } from "./db/database.js"; mysql
import { connectDB } from './db/database.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// 라우터
app.use('/tweets', tweetRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

connectDB()
  .then(() => {
    const server = app.listen(config.host.port);
    initSocket(server);
  })
  .catch(console.error);

// mysql
// db.getConnection().then(connection => console.log(connection)) 연결 확인용
// const server = app.listen(config.host.port);
// initSocket(server);

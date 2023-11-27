import * as tweetRepository from '../data/tweets.js';
import { getSocketIO } from '../connection/socket.js';

// 데이터를 여기에서 로직처리

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username) // username 있으면 해당 유저의 글만 추출
    : tweetRepository.getAll()); // username없으면 전체게시물 추출
  return res.status(200).json(data);
}

// getTweet
export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id); //getByID는 특정게시물 아이디를 가진애 추출
  if (tweet) {
    return res.status(200).json(tweet);
  } else {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

// createTweet
export async function createTweet(req, res, next) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId); // 만들 텍스트와 로그인한 유저(토큰)의 아이디 전달해서 무조건 자신의 게시물을 쓰게끔
  res.status(201).json(tweet);
  getSocketIO().emit('tweets'.tweet);
}

//updateTweet
export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.getById(id); //바꾸고싶은 게시글아이디로 검색해서 게시글 불러옴

  if (!tweet) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
  if (req.userId !== tweet.userId) {
    return res.status(404).json({ message: `작성자가 아닙니다.` }); //일치안할시
  }
  const update = await tweetRepository.update(id, text); //일치할시
  return res.status(200).json(update);
}

//deleteTweet
export async function deleteTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);

  if (!tweet) {
    return res.status(404).json({ message: `There is No id: ${id}` });
  }
  if (tweet.userId !== req.userId) {
    return res.status(403).json({ message: '본인 글만 삭제할 수 있습니다.' });
  }

  const del = await tweetRepository.remove(id);
  res.sendStatus(204);
}

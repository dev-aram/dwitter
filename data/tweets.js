import * as userRepository from './auth.js';
import MongoDb from 'mongodb';
import { getTweets } from '../db/database.js';
const ObjectId = MongoDb.ObjectId;

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt,  tw.userId, us.username, us.name, us.email, us.url from users us join tweets tw on  tw.userId = us.id';

const ORDER_DESC = 'order by tw.createdAt DESC';

export async function getAll() {
  return getTweets()
    .find()
    .sort({ createAt: -1 }) // -1 내림차순
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets().find({ username }).sort({ createAt: -1 }).toArray().then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .find({ _id: new ObjectId(id) })
    .next()
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  return userRepository
    .findById(userId)
    .then((user) =>
      getTweets().insertOne({
        text,
        createdAt: new Date(),
        userId,
        name: user.name,
        username: user.username,
        url: user.url,
      })
    )
    .then((result) => {
      return getById(result.insertedId.toString());
    })
    .then(mapOptionalTweet);
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text: text } },
      { returnDocument: 'after' }
    )
    .then((result) => result)
    .then(mapOptionalTweet);
  // .then((result) => getById(id));
  // .updateOne({ _id: new ObjectId(id) }, { $set: { text: text } }, { returnOrigonal: false })
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}

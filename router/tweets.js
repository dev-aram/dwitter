import express from "express";
import * as tweetController from '../controller/tweet.js';
import { body, param, validationResult } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from "../middleware/auth.js";
const router = express.Router()

const validateTweet = [
    body('text').trim().isLength({min:3}).withMessage('최소 3자 이상 입력하세요'),
    validate
]

/*
    post, put에 text에 빈문자열을 없애고,
    최소3자이상 입력해야 저장되도록 API적용
*/

// GET / tweets
// GET / tweets?username=:username
router.get("/",isAuth, tweetController.getTweets)

// GET / tweets/:id
router.get('/:id',isAuth,tweetController.getTweet)

// POST / tweets
router.post('/',validateTweet,isAuth, tweetController.createTweet)

// PUT / tweets/:id
router.put('/:id',validateTweet,isAuth ,tweetController.updateTweet)

// DELETE / tweets/:id
router.delete('/:id',isAuth,tweetController.deleteTweet)

export default router;
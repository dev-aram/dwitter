import express  from "express";
import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";
import {body, param} from "express-validator";

const validateJoin = [
    body('username').trim().isLength({min:5}).withMessage('username을 5글자 이상 입력하세요'), validate,
    body('password').trim().isLength({min:5}).withMessage('password를 5글자 이상 입력하세요'), validate,
    body('email').trim().isEmail().withMessage('이메일 형식을 맞춰서 입력해주세요.')
]

/*
    회원가입 / post
    router.post('/signup,...)

    로그인 / post
    router.post('/login',...)

    JWT 확인 / get
    router.get('/me',...)
*/

// 회원가입
const router = express.Router();

router.post("/signup",validateJoin, authController.joinUser)
router.post("/login",authController.login)
router.get("/me",authController.jwtToken)

export default router;
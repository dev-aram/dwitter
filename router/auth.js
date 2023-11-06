import express  from "express";
import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
import {body, param} from "express-validator";

const vaildateCredential = [
    body('username').trim().notEmpty().withMessage('username을 입력하세요'),
    body('password').trim().isLength({min:4}).withMessage('password를 4자 이상 입력하세요'), validate,
]

const validateJoin = [
    ... vaildateCredential,
    body('name').trim().notEmpty().withMessage('이름을 입력해주세요'),
    body('email').isEmail().withMessage('이메일 형식에 맞춰서 입력해주세요.'),
    body('url').isURL().withMessage('URL 형식 확인').optional({nullable: true, checkFalsy:true}), validate
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

router.post("/signup",validateJoin, authController.signup)
router.get("/me",isAuth ,authController.me)
router.post("/login",vaildateCredential, authController.login)

export default router;
import * as authRepository from "../data/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// 시크릿키
const secret = 'abcdefg1234%^&*';
let token = {}
let client;

// 함수
export async function tokenMake(id) {
   token = jwt.sign(
    {
        id:id,
        isAdmin: false
    },
    secret,
    {expiresIn: 3000}
   )
   return token
}

// join
export async function joinUser(req, res, next) {
    const {id, username, password, name, email} = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    const user = await authRepository.join(id, username, hashed, name, email);

    if(user){
        res.status(200).json(user)
    }else{
        res.status(400).json({message:`회원가입 실패.`})
    }
}

// login
export async function login(req, res, next) {
    const {username, password} = req.body;
    const user = await authRepository.login(username, password)

    if(user){
        if(bcrypt.compareSync(password, user.password)){
            res.status(200).json(user)
            client = tokenMake(username);
        }else{
            res.status(400).json({message:'비밀번호를 확인해주세요.'})
        }
        
    }else{
        res.status(400).json({message:'아이디를 확인해주세요.'})
    }
}

// jwt
export async function jwtToken(req, res, next) {
    res.header('token', client)
    res.status(200).json(req.headers.token)
}
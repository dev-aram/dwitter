import * as userRepository from "../data/auth.js";
import bcrypt from "bcrypt";
import { config } from "../config.js"
import jwt from "jsonwebtoken";


// 함수
function createJwtToken(id) {
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn:config.jwt.expiersInSec});
 } 

export async function signup(req, res) {
    const {username, password, name, email, url} = req.body;
    // 아이디 중복 검사
    const found = await userRepository.findByUsername(username);

    if(found){
        return res.status(409).json({message:`${username}이 이미 가입 되었음`})
    }

    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url
    });
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}

// jwt
export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({message:'사용자를 찾을 수 없음'})
    }
    res.status(200).json({token:req.token, username:user.username});
}

// login
export async function login(req, res) {
    // 아이디 비번 받기
    const {username, password} = req.body;

    // 아이디 중복 검사
    const found = await userRepository.findByUsername(username);

    // 아이디가 없을 경우
    if(!found){
        return res.status(401).json({message:'아이디를 확인해주세요.'})
    }

    // 입력한 비밀번호와 db에 있는 비밀번호 검사
    let pwCheck = await bcrypt.compare(password, found.password)
    if(!pwCheck){
        res.status(401).json({message:'비밀번호를 확인해주세요.'})   
    }
    const token = createJwtToken(found.id);
    res.status(201).json({token, username});
}
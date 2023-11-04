import * as authRepository from "../data/auth.js";
import bcrypt from "bcrypt";



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

// 회원가입
export async function login(req, res, next) {
    const {username, password} = req.body;
    const user = await authRepository.login(username, password)

    if(user){
        if(bcrypt.compareSync(password, user.password)){
            res.status(200).json(user)
        }else{
            res.status(400).json({message:'비밀번호를 확인해주세요.'})
        }
        
    }else{
        res.status(400).json({message:'아이디를 확인해주세요.'})
    }
}
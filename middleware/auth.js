import  jwt  from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js"

const AUTH_ERROR = {message:'인증 에러!'};

export const isAuth = async(req, res, next) =>{
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        console.log("에러1");
        return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token, config.jwt.secretKey , async(error, decoded)=>{
            if(error){
                console.log("에러2");
                return res.status(401).json(AUTH_ERROR);
            }
            const user= await userRepository.findById(decoded.id);
            if(!user){
                console.log("에러3");
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            next();
        }
    )
};
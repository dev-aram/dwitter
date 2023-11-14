import SQ  from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
    // 자동으로 뒤에 s가 붙음
    'user',
    {
        id: {
            type: DataTypes.INTEGER, //데이터타입
            autoIncrement:true, // 오토인크리먼트
            allowNull:false, // 널값 허용
            primaryKey:true // pk사용
        },
        username:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password:{
            type:DataTypes.STRING(128),
            allowNull:false
        },
        name:{
            type:DataTypes.STRING(128),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(128),
            allowNull:false
        },
        url:DataTypes.TEXT
    },
    {timestamps:false}
)

// let users = [
//     {
//         id: '1',
//         username: 'apple',
//         password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
//         name:'김사과',
//         email:'apple@apple.com',
//         url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU'
//     },
//     {
//         id: '2',
//         username: 'banana',
//         password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
//         name:'반하나',
//         email:'banana@banana.com',
//         url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU'
//     },
// ]


// 유저이름 중복검사
export async function findByUsername(username) {
    // return users.find((user)=> user.username === username);
    // return db.execute('SELECT * FROM users WHERE username = ?',[username]).then(result => {return result[0][0]})
    return User.findOne({where: {username}})
}

// id 중복검사
export async function findById(id) {
    // return users.find((user)=> user.id === id);
    // return db.execute('SELECT * FROM users WHERE id = ?',[id]).then(result => {return result[0][0]})
    return User.findByPk(id); //primary에서 찾는다
}

// 회원가입
export async function createUser(user) {
    // const {username, password, name, email, url} = user;
    // return db.execute('INSERT INTO users(username, password,  name, email, url) values(?,?,?,?,?)', [username, password, name, email, url]).then((result)=> result[0].insertId)
    // const created = {id:'10', ...user}
    // users.push(created);
    // return created.id;

    return User.create(user).then((data)=>data.dataValues.id)
}
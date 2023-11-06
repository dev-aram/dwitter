import bcrypt from "bcrypt";
let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name:'김사과',
        email:'apple@apple.com',
        url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU'
    },
    {
        id: '2',
        username: 'banana',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name:'반하나',
        email:'banana@banana.com',
        url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU'
    },
]

// 유저이름 중복검사
export async function findByUsername(username) {
    return users.find((user)=> user.username === username);
}

// id 중복검사
export async function findById(id) {
    return users.find((user)=> user.id === id);
}

// 회원가입
export async function createUser(user) {
    const created = {id:'10', ...user}
    users.push(created);
    return created.id;
}
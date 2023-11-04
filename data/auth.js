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
]

export async function join(id, username, password, name, email) {
    const user = {
        id: '2',
        username,
        password,
        name,
        email,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
    }
    users = [user, ...users]
    return user;
}

export async function login(id, password) {
    const user = users.find((user)=> user.username === id);
    return user;
}
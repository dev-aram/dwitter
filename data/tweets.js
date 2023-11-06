import * as userRepository from '../data/auth.js';
let tweets = [
    {
        id : '1',
        text : '안녕하세요',
        createdAt : Date.now().toString(),
        userId:'1'
    },
    {
        id : '2',
        text : '반갑습니다',
        createdAt : Date.now().toString(),
        userId:'2'
    }
];

export async function getAll(){
    return Promise.all(
        tweets.map( async(tweet) =>{
            const {username, name, url} = await userRepository.findById(tweet.userId);
            return {...tweet, username, name, url}
        })
    );
}

export async function getAllByUsername(username){
    return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
}

export async function getById(id) {
    const found = tweets.find((tweet) => tweet.id === id);
    if(!found){
        return nill;
    }
    const {username, name, url} = await userRepository.findById(found.userId);
    return {...found, username, name, url}
}

export async function create(text,userId) {
    const tweet = {
        id:'10',
        text,
        createdAt: Date.now().toString(),
        userId
    }
    tweets = [tweet, ... tweets]
    return getById(tweet.id)
}

export async function update(id,text){
    const tweet = tweets.find((tweet)=>tweet.id === id)
    if(tweet){
        tweet.text = text
    }
    return getById(tweet.id)
}

export async function remove(id){
    return tweets.filter((tweet) => tweet.id !== id)
}
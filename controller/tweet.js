import * as tweetRepository from '../data/tweets.js';

export async function getTweets(req,res){ 
    const username = req.query.username
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll()
        )
        return res.status(200).json(data)
}

// getTweet
export async function getTweet(req,res,next) {
    const id = req.params.id
    const tweet =await tweetRepository.getById(id)
    if(tweet){
        return res.status(200).json(tweet)
    }else{
        return res.status(404).json({message:`Tweet id(${id}) not found`})
    }
}

// createTweet
export async function createTweet(req,res,next){
    const {text} = req.body
    const tweet = await tweetRepository.create(text, req.userId)
    res.status(201).json(tweet)
}

//updateTweet
export async function updateTweet(req,res,next){
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.getById(id)

    if(!tweet) {
        return res.status(404).json({message:`Tweet id(${id}) not found`})

    }
    if(req.userId !== tweet.userId){
        return res.status(404).json({message:`작성자가 아닙니다.`})
    }
    const update = await tweetRepository.update(id,text)
    return res.status(200).json(update)
}

//deleteTweet
export async function deleteTweet(req,res,next){
    const id =req.params.id
    const tweet = await tweetRepository.getById(id)

    if(!tweet) {
        return res.status(404).json({message:`Tweet id(${id}) not found`})

    }
    if(req.userId !== tweet.userId){
        return res.status(404).json({message:`작성자가 아닙니다.`})
    }
    await tweetRepository.remove(id)
    return res.sendStatus(204)

}
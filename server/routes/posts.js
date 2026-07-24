const express = require('express')
const Post = require('../models/Post')
const {protect} = require('../middleware/auth')
const router = express.Router();

router.get('/', async(req,res) => {
    try {
        let query = {};
        if(req.query.tag){
            query.tags = req.query.tag; //query = {tags:"react"}
        }
        const allPosts = await Post.find(query).populate('author', 'username').sort({createdAt: -1});
        return res.status(200).json({message: 'Posts fetched successfully', allPosts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Unable to load posts successfully'})  
    }
})

router.post('/', protect, async(req, res) => {
    try {
        const { title, content, tags } = req.body;
        if(!title || !content){
            return res.status(400).json({message : 'Title or content is missing'});
        }
        const newPost = await Post.create({title, content, tags: tags || [], author:req.user._id});
        return res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
})

router.put('/:id/vote', protect, async(req, res) => {
    try {
        const { id } = req.params; //find the user id
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({message:'Post does not exist'})
        }
        //check whether the said id has already voted or not, if yes then remove the vote, if no then 
        const alreadyVoted = post.upvotes.some(vote => {
            return vote.toString() === req.user._id.toString()})
        if(alreadyVoted){
            post.upvotes = post.upvotes.filter(vote => vote.toString() !== req.user._id.toString()) //post.upvotes will have all the votes which dont have the user id of the user who has already voted
        } else {
            post.upvotes.push(req.user._id)
        }
        await post.save();
        return res.status(200).json({message:'Updated upvote data returned successfully', voteCount: post.upvotes.length, upvotes: post.upvotes, post});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
})

module.exports = router;
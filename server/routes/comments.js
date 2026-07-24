const express = require('express')
const Comment = require('../models/Comment')
const protect = require('../middleware/auth')
const router = express.Router();

router.get('/:postId', async(req,res) => {
    try {
        const {postId} = req.params;
        const allComments = await Comment.find({post: postId}).populate('author', 'username').sort({createdAt: -1});
        return res.status(200).json({message: 'Comments fetched successfully', allComments})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Unable to load comments successfully'})  
    }
})

router.post('/:postId', protect, async(req,res) => {
    try {
        const {postId} = req.params;
        const {content} = req.body;
        if(!content){
            return res.status(400).json({message : 'Content is missing'});
        }
        const newComment = await Comment.create({content, post:postId, author: req.user._id});
        return res.status(201).json({message:'New comment created',newComment});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Unable to create comment successfully'})  
    }
})

module.exports = router;
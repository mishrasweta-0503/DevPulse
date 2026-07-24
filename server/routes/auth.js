const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');

const router = express.Router();

router.post('/register', async(req,res) => {
    try {
        const {username,email,password} = req.body;
        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        if(existingUser){
            return res.status(400).json({message : 'Username or email already exists'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({username:username, email:email, password:hashedPassword});
        const payload = { id: newUser._id };
        // 2. Sign the token using a secret key and options
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, // Store this secure string in your .env file
            { expiresIn: '7d' }    // Token expires in 30 days (optional)
        );
        res.status(201).json({
            token: token,
            "user": {
                "id": newUser._id,
                "username": newUser.username,
                "email": newUser.email
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }

})

router.post('/login', async(req,res) => {
    try {
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message : 'Invalid Credentials'})
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return res.status(400).json({message : 'passwords dont match'})
        }
        const payload = { id: existingUser._id };
        // 2. Sign the token using a secret key and options
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, // Store this secure string in your .env file
            { expiresIn: '7d' }    // Token expires in 30 days (optional)
        );
        res.status(200).json({
            token: token,
            "user": {
                "id": existingUser._id,
                "username": existingUser.username,
                "email": existingUser.email
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }

})

module.exports = router;
//protects private routes by verifying incoming jwt tokens

const jwt = require('jsonwebtoken');

//getting the user

const User = require('../models/User');

//Extracting the token from req.headers.authorization
const protect = async(req,res,next) => {
    try {
        //get the header
        const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer ')){
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const findUser = await User.findById(decoded.id).select('-password');
        if (!findUser) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        req.user = findUser;
        next() 
    }else{
        return res.status(401).json({message: "No token, authorization denied"});
    }
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'Invalid Token!'})       
    }
}

module.exports = protect;
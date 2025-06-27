//For protecting the chat endpoint

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

async function protect (req, res, next){
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token, config.jwtSecret);
            req.user=await User.findById(decoded.id).select('-password');
            if(!req.user){
                return res.status(401).json({message: 'Not authorized, user not found '});
            }
            next();
        }catch(error){
            console.error('Token verification failed:', error);
            if(error.name === 'TokenExpiredError'){
                return res.status(401).json({message: 'Not authorized, token failed'});
            }
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
    } 
    if (!token){
        res.status(401).json({message: 'Not authorized, no token'});
    }
}

module.exports = protect;
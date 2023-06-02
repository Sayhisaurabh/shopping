const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../model/user')
const authMiddleware = async(req,res,next)=>{
try {
    const token = req.headers.authorization.split(" ")[1]
    const loginUser = await jwt.verify(token,process.env.PRIVATE_KEY)
    if(loginUser){
        req.userId = loginUser.id
        next();
    }else{
        res.status(400).json({
            message:"Authantication Failed",
            status :false
             
        })  
    }
} catch (error) {
    res.status(400).json({
        message:"Authantication Failed",
        status :false
         
    })

}
}

const isAdmin = async (req,res,next)=>{
    try {
        const id = req.userId;
        const loginUser = await User.findById(id)
        if(loginUser.role == 'admin'){
                next()
        }else{
            res.status(400).json({
                message:"This Route is Only For Admin",
                status :false
                 
            }) 
        }
    } catch (error) {
        res.status(400).json({
            message:"This Route is Only For Admin",
            status :false
             
        })
    }
}
module.exports = {authMiddleware,isAdmin}
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../model/user')
const authMiddleware = async(req,res,next)=>{
try {
    const token = req.headers.authorization.split(" ")[1]
    const {email} = await jwt.verify(token,process.env.PRIVATE_KEY)
    const user = await User.findOne({email})
    if(user){
        req.user = user
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
        const {role} = req.user
        if(role == 'ADMIN'){
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
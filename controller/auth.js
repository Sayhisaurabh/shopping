const { generateToken } = require("../helper/helper");
const User = require("../model/user");
//register start
const register = async(req,res)=>{
    try {
        const {email} = req.body
        const isAlready = await User.findOne({email})
        if(isAlready){
            res.status(400).json({
            message:"Email Already Filled",
            status :false,
            data:null 
            })
        }else{
            const add = await User.create(req.body)
            const token = generateToken(add._id)
            res.status(200).json({
               message:"User Register Successfully",
               status :true,
               data:add,
               token:token
            })
        }
         
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status :false,
            data:null 
        })
    }
}
//register end

//login start
const login = async(req,res)=>{
try {
    const {email,password} = req.body
    const isUser = await User.findOne({email})
    if(isUser && await isUser.isPasswordMatched(password)){
        const token = generateToken(isUser._id);
        res.status(200).json({
            message:"Login Successfully",
            status :true,
            data:{
             "id":isUser?._id,
             "name":isUser?.name,
             "email":isUser?.email,
             "mobile":isUser?.mobile,
            },
            token:token
        }) 
    }else{
        res.status(400).json({
            message:"Credential Not Match In Our Records",
            status :false,
            data:null
        }) 
    }
} catch (error) {
    res.status(400).json({
        message:error.message,
        status :false,
        data:null
    })
}
}
//login end
module.exports = {register,login}
const { generateToken,passwordbcrypt} = require("../helper/helper");
const User = require("../model/user");
//register start
const register = async(req,res)=>{
    try {
        const {name,email,mobile,password} = req.body
        const isAlready = await User.findOne({email})
        if(isAlready){
            res.status(400).json({
            message:"Email Already Filled",
            status :false,
            data:null 
            })
        }else{
            const token = generateToken(email)
            const bycrptPass = await passwordbcrypt(password)
            await User.create({
            name : name,
            email : email,
            mobile : mobile,
            password : bycrptPass,
            token : token
            })
            res.status(200).json({
               message:"User Register Successfully",
               status :true,
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
        const token = generateToken(email);
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
//get all Users
const getUsers = async(req,res)=>{
    try {
        // const {id} = req.user.id
        // const loginUser = await User.findOne({id}).select('name')
        const users = await User.find({})
        res.status(200).json({
            message:"success",
            status :true,
            data:users    
        })
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status :false,
            data:null
        })
    }
}
//get all Users
//get single user
const getSingleUser = async(req,res)=>{
    try {
        const {id} = req.params
        const getSingle = await User.findById(id)
        if(getSingle){
            res.status(200).json({
                message:"Success",
                status :true,
                data:getSingle
            }) 
        }else{
            res.status(400).json({
                message:"User Not Found",
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
//get single user
//update single user
const updateSingleUser = async(req,res)=>{
    try {
        const {id} = req.params
        const update = await User.findByIdAndUpdate(id,req.body)
        if(update){
            const updatedUser = await User.findById(id);
            res.status(200).json({
                message:"Updated Successfully",
                status :true,
                data:updatedUser
            }) 
        }else{
            res.status(400).json({
                message:"User Not Found",
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
//update single user
//delete single user
const deleteSingleUser = async(req,res)=>{
    try {
        const {id} = req.params
        const deletedUser = await User.findByIdAndDelete(id)
        if(deletedUser){
            res.status(200).json({
                message:"User Deleted Succesfully",
                status :true,
                data:deletedUser
            })  
        }else{
            res.status(400).json({
                message:"User Not Found",
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
//delete single user

module.exports = {register,login,getUsers,getSingleUser,updateSingleUser,deleteSingleUser}
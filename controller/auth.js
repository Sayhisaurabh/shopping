const { generateToken,passwordbcrypt,generateRandmonString} = require("../helper/helper");
const { sendMail } = require("../helper/mail");
const User = require("../model/user");
const Subscription = require('../model/subscription')
const {addDays,subDays,format} = require('date-fns')
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
           const data =  await User.create({
            name : name,
            email : email,
            mobile : mobile,
            password : bycrptPass,
            token : token
            })
            sendMail(data,'New Register','register');
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
        const {_id} = isUser
        const token = generateToken(email);
        await User.findOneAndUpdate({_id},{$push:{token:token}})
        res.status(200).json({
            message:"Login Successfully",
            status :true,
            token:token
        }) 
    }else{
        res.status(400).json({
            message:"Credential Not Match In Our Records",
            status :false
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
//logout user
const logout = async(req,res)=>{
    try {
        const {_id} = req.user
        const token = req.getToken
const logout  = await User.findOneAndUpdate({_id},{$pull:{token:token}})
if(logout){
    res.status(200).json({
        message:"Logout Successfully",
        status :true,
         
    })
}else{
    res.status(400).json({
        message:"Please Login First",
        status :false,
         
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
//logout user
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

///forgot Password

const forgotPassword = async(req,res)=>{
    try {
        const {email} =req.body;
        const isUser = await User.findOne({email:email})
        if(isUser){
            const {_id } = isUser;
        const refreshToken = await generateRandmonString();
        const updateUser = await User.findByIdAndUpdate(_id,{refreshToken : refreshToken},{new :true})
        sendMail(updateUser,'Forgot Password','forgot-password')
        res.status(200).json({
            success :true,
            message:"Please Check Your Mail for Forgot Password Link"
        }) 
        }else{
            res.status(200).json({
                success :false,
                message:"This Email Does Not Exists",
                data:null
            })  
        }
    } catch (error) {
        res.status(400).json({
            success :false,
            message:error.message,
            data:null
        }) 
    }
}
///forgot Password
// reset Password

const resetPassword = async (req,res)=>{
try {
    const {token} = req.params
    const {password}=req.body
    if(password){
        const isUser = await User.findOne({refreshToken:token})
        if(isUser){
            const {_id}= isUser
            const bcryptPassword = await passwordbcrypt(password);
    const update  = await User.findByIdAndUpdate(_id,{password : bcryptPassword})
    res.status(200).json({
        success :true,
        message:"Password Updated Successfully",
        data:null
    }) 
        }else{
            res.status(200).json({
                success :false,
                message:"Token is Invalid Please Check Your Email",
                data:null
            }) 
        }
    }else{
        res.status(200).json({
            success :false,
            message:"Please Fill Password",
            data:null
        })
    }
   
} catch (error) {
    res.status(400).json({
        success :false,
        message:error.message,
        data:null
    }) 
}
}
// reset Password

const subscription = async(req,res)=>{
try {
    const {amount,days} = req.body
    const {_id} = req.user
    const premiumTill = addDays(new Date(),days)
const update  = await User.findByIdAndUpdate(_id,{premium:true,premiumTill : premiumTill})
if(update){
const subsData = new Subscription({
user_id : _id,
premiumTill : premiumTill,
amount : amount,
paymentMethod : 'Paytm',
})
subsData.save();
    res.status(200).json({
        success :true,
        message:"You Have Successfully Buy Premium Plan",
        data:null
    })
}
 
} catch (error) {
    res.status(400).json({
        success :false,
        message:error.message,
        data:null
    }) 
}
}
const subscriptionList = async(req,res)=>{
    try {
        const list = await Subscription.find({}).populate('user_id','name').lean();
        list.forEach((x) => {
            x.premiumTill = format(x.premiumTill, 'dd-MMMM-yyyy hh:mm a');
            x.createdAt = format(x.createdAt, 'dd-MMMM-yyyy hh:mm a');
          })
        res.status(200).json({
            success :true,
            message:"All Subscription Users List",
            data:list
        }) 
    } catch (error) {
        res.status(400).json({
            success :false,
            message:error.message,
            data:null
        })  
    }
}
module.exports = {register,
    login,
    logout,
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    forgotPassword,
    resetPassword,
    subscription,
    subscriptionList
}
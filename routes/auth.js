const express = require('express');
const { register,login,logout,getUsers,getSingleUser,updateSingleUser,deleteSingleUser } = require('../controller/auth');
const {authMiddleware,isAdmin} = require('../middleware/auth');
const { sendMail } = require('../helper/mail');
const router = express.Router();
//register routes
router.post('/register',register)
router.post('/login',login)
router.post('/logout',authMiddleware,logout)
router.get('/user',authMiddleware,isAdmin,getUsers)
router.get('/user/:id',authMiddleware,isAdmin,getSingleUser)
router.patch('/user/:id',authMiddleware,isAdmin,updateSingleUser)
router.delete('/user/:id',authMiddleware,isAdmin,deleteSingleUser)
router.get('/sendMail',async (req,res)=>{
try {
  const data = {
    name: 'Saurabh Tyagi',
  };
  const subject = 'Forgot Password'
   const response = sendMail(data,subject,'forgot-password');
   res.status(200).json({
    message:response,
    status :true,
     
})
 
} catch (error) {
    res.status(200).json({
        message:error.message,
        status :false,
         
    }) 
}
})
module.exports = router;
const express = require('express');
const nodemailer = require("nodemailer");
const { register,login,logout,getUsers,getSingleUser,updateSingleUser,deleteSingleUser } = require('../controller/auth');
const {authMiddleware,isAdmin} = require('../middleware/auth');
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
    const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
     
    user: '8ec800189b3429',
    pass: '91d6108f25d84d'
  }
});
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'sayhisaurabh@gmail.com', // sender address
    to: "sayhisaurabh@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  res.status(200).json({
    message:"Mail Send",
    status :info.messageId,
     
})
 
} catch (error) {
    res.status(200).json({
        message:error.message,
        status :false,
         
    }) 
}
})
module.exports = router;
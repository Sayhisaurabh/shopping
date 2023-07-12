const express = require('express');
const { register,login,logout,getUsers,getSingleUser,updateSingleUser,deleteSingleUser,forgotPassword,resetPassword} = require('../controller/auth');
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
router.post('/forgot-password',authMiddleware,forgotPassword)
router.post('/reset-password/:token',authMiddleware,resetPassword)
module.exports = router;
const express = require('express');
const { register,login,logout,getUsers,getSingleUser,updateSingleUser,deleteSingleUser,forgotPassword,resetPassword,subscription,subscriptionList} = require('../controller/auth');
const {authMiddleware,isAdmin,isPremium} = require('../middleware/auth');
const { sendMail } = require('../helper/mail');
const router = express.Router();
//register routes
router.post('/register',register)
router.post('/login',login)
router.post('/logout',authMiddleware,logout)
router.get('/user',authMiddleware,isAdmin,isPremium,getUsers)
router.get('/user/:id',authMiddleware,isAdmin,getSingleUser)
router.patch('/user/:id',authMiddleware,isAdmin,updateSingleUser)
router.delete('/user/:id',authMiddleware,isAdmin,deleteSingleUser)
router.post('/forgot-password',authMiddleware,forgotPassword)
router.post('/reset-password/:token',authMiddleware,resetPassword)
router.post('/buy-subscription',authMiddleware,subscription)
router.get('/subscription',authMiddleware,subscriptionList)
module.exports = router;
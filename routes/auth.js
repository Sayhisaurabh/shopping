const express = require('express');
const { register,login,getUsers,getSingleUser,updateSingleUser,deleteSingleUser } = require('../controller/auth');
const {authMiddleware,isAdmin} = require('../middleware/auth');
const router = express.Router();
//register routes
router.post('/register',register)
router.post('/login',login)
router.get('/user',authMiddleware,isAdmin,getUsers)
router.get('/user/:id',authMiddleware,isAdmin,getSingleUser)
router.patch('/user/:id',authMiddleware,isAdmin,updateSingleUser)
router.delete('/user/:id',authMiddleware,isAdmin,deleteSingleUser)
module.exports = router;
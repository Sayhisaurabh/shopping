const express = require('express');
const { addReview } = require('../controller/review');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router()
 
router.post('/review',authMiddleware,addReview)

module.exports = router
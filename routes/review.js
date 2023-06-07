const express = require('express');
const { addReview } = require('../controller/review');
const router = express.Router()
 
router.post('/review',addReview)

module.exports = router
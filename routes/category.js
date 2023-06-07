const express  = require("express");
const { addCategory,getCategory } = require("../controller/category");
const router = express.Router();

router.post('/category',addCategory)
router.get('/category',getCategory)
module.exports = router







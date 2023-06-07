const express = require('express');
const { addProduct, getProducts } = require('../controller/product');
const  router = express.Router();


router.post('/product',addProduct)
router.get('/product',getProducts)
module.exports = router
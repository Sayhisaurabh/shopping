const express = require('express');
const { addProduct, getProducts, addToCart ,addToWishlist } = require('../controller/product');
const  router = express.Router();
const {authMiddleware,isAdmin} = require('../middleware/auth');

router.post('/product',addProduct)
router.get('/product',getProducts)
router.post('/cart',authMiddleware,addToCart)
router.post('/wishlist',authMiddleware,addToWishlist)
module.exports = router
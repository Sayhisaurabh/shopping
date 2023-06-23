const Product = require("../model/product");
const User = require('../model/user')
const { findByIdAndUpdate, findOne, findByIdAndRemove } = require("../model/user");
//add Product
const addProduct = async(req,res)=>{
    try {
        const {name}=req.body
        const isAlready = await Product.findOne({name})
        if(isAlready){
            res.status(400).json({
                message:"Product Already Exists",
                status :false,
                data:null
            })
        }else{
const add = await Product.create(req.body)
res.status(400).json({
    message:"Product Added Successfully",
    status :true,
    data:add
})
        }
    } catch (error) {
      res.status(400).json({
        message:error.message,
        status :false,
        data:null
    })  
    }
}
//get All Product

const getProducts = async(req,res)=>{
    try {
      const {name,price,page} = req.query
      const limit = 3
      const skip = (page -1)*limit
      const query = {}
      if(name){  query.name = {$regex :name ,$options : "i"}  }
      if(price){query.price = {$lte : price} }
        const get = await Product.find(query).populate('cat_id','name').skip(skip).limit(limit)
        res.status(400).json({
            message:"All Products",
            status :true,
            length : get.length,
            data:get,
        })
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status :false,
            data:null
        }) 
    }
}

// add to cart
//get All Product

const addToCart = async(req,res)=>{
    try {
      const {productId} = req.body
      const {_id} = req.user
      const isAlready = await User.findOne({_id,cart:productId})
      if(isAlready){
        await User.findOneAndUpdate({_id},{$pull:{cart:productId}})
        res.status(400).json({
            message:"Product Remove From Cart",
            status :true,
        })
      }else{
        await User.findOneAndUpdate({_id},{$push:{cart:productId}})
        res.status(400).json({
          message:"Product Added To Cart",
          status :true,
      })
      }
     
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status :false,
             
        }) 
    }
}

// add to Wishlist

const addToWishlist = async(req,res)=>{
    try {
      const {productId} = req.body
      const {_id} = req.user
      const isAlready = await User.findOne({_id,wishlist:productId})
      if(isAlready){
        await User.findOneAndUpdate({_id},{$pull:{wishlist:productId}})
        res.status(400).json({
            message:"Product Remove From Wishlist",
            status :true,
        })
      }else{
        await User.findOneAndUpdate({_id},{$push:{wishlist:productId}})
        res.status(400).json({
          message:"Product Added To Wishlist",
          status :true,
      })
      }
     
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status :false,
             
        }) 
    }
}
module.exports = {
    addProduct,
    getProducts,
    addToCart,
    addToWishlist
}
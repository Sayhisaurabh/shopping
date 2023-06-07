const Product = require("../model/product");
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
        const get = await Product.find({}).populate('cat_id','name')
        res.status(400).json({
            message:"All Products",
            status :true,
            data:get
        })
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status :false,
            data:null
        }) 
    }
}
module.exports = {
    addProduct,
    getProducts
}
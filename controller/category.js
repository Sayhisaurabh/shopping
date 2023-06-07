const Category = require("../model/category")
//add Category
const addCategory = async (req,res)=>{
try {
    const {name} = req.body
    const isAlready = await Category.findOne({name})
    if(isAlready){
        res.status(400).json({
            message:"Name Already Exists",
            status :false,
            data:null
        }) 
    }else{
        const add = await Category.create(req.body);
        res.status(200).json({
            message:"Category add Successfully",
            status:true,
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
// get category
const getCategory = async(req,res)=>{
    try {
        const allCategory = await Category.aggregate([
            {
              $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'cat_id',
                as: 'products'
              }
            },
            {
                $unwind: '$products' // Unwind the first lookup array
              },
              {
              $lookup: {
                from: 'reviews',
                localField: 'products._id',
                foreignField: 'product_id',
                as: 'reviews'
              }
            }
          ]) 
        res.status(200).json({
            message:"All Category",
            status :true,
            data:allCategory
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
    addCategory,
    getCategory
}
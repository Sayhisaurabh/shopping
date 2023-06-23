const Review = require("../model/review");

const addReview = async(req,res)=>{
    try {
        const{comment,rating,product_id} = req.body
        const {_id} = req.user
     const add = await Review.create({
        comment,rating,product_id,user_id:_id
     })
     res.status(200).json({
        message:"Added",
        status :true,
        data:add
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
    addReview 
}
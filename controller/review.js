const Review = require("../model/review");

const addReview = async(req,res)=>{
    try {
     const add = await Review.create(req.body)
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
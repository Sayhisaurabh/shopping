const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var reviewSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    user_id:{
         type:mongoose.Schema.Types.ObjectId,
    }
    
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Review', reviewSchema);
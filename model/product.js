const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    desc:{
        type:String,
    },
    cat_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Category'
    },
    price: {
        type: Number,
        default: '0'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);
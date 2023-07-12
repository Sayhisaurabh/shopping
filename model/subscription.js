const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var subscriptionSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref :'User'
    },
    premiumTill:{
        type: Date,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
    },
},
{
    timestamps :true
}

);

//Export the model
module.exports = mongoose.model('Subscription', subscriptionSchema);
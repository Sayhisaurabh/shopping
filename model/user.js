const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default: "user"
    },
    token:[{
        type:String,
        required:true,
    }],
    refreshToken:{
        type:String,
        required:false,
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }],
    premium :{
        type : Boolean,
        default :false
    },
    premiumTill :{
       type : Date,
       required:false,
    }
    
},
{
    timestamps:true 
});

// userSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(this.password, 10)
// });
userSchema.methods.isPasswordMatched = async function (userPassword){
return await bcrypt.compare(userPassword, this.password)
}
 
//Export the model
module.exports = mongoose.model('User', userSchema);
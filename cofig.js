const mongoose = require('mongoose');
const connectDB = () =>{
    mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Database is Connected!'));
}
module.exports = connectDB
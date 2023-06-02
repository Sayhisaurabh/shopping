const jwt = require('jsonwebtoken');
//generate token
const generateToken = function (id){
   const token = jwt.sign({ id }, process.env.PRIVATE_KEY, {expiresIn: '1d' }); 
   return token
}
module.exports ={generateToken}
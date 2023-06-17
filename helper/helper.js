const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//generate token
const generateToken = function (email){
   const token = jwt.sign({ email }, process.env.PRIVATE_KEY, {expiresIn: '1d' }); 
   return token
}
//genereate hash password
const passwordbcrypt = async function (password){
   return await bcrypt.hash(password, 10)
   }
module.exports ={generateToken,passwordbcrypt}
const fs = require('fs');
const path = require('path');
const ejs = require('ejs')
const nodemailer = require("nodemailer");
const sendMail = async(data,subject,template)=>{
   
        const filePath = path.join(__dirname, '..', 'mail', `${template}.ejs`);
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.MAIL_PORT,
            auth: {
               
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
            }
          })
          const templateFile = fs.readFileSync(filePath, 'utf-8');
            const renderedTemplate = ejs.render(templateFile, data);
            const info = await transporter.sendMail({
                from: process.env.FROM, 
                to: data.email,
                subject: subject, 
                html: renderedTemplate,
              });
              // console.log(info)
              return info
}

module.exports = {
    sendMail 
}
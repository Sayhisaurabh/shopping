const fs = require('fs');
const path = require('path');
const ejs = require('ejs')
const nodemailer = require("nodemailer");
const sendMail = async(data,subject,template)=>{
   
        const filePath = path.join(__dirname, '..', 'mail', `${template}.ejs`);
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
               
              user: 'sayhisaurabh@gmail.com',
              pass: 'vpzaahrkrcwnyhde'
            }
          })
          const templateFile = fs.readFileSync(filePath, 'utf-8');
            const renderedTemplate = ejs.render(templateFile, data);
            const info = await transporter.sendMail({
                from: 'sayhisaurabh@gmail.com', 
                to: data.email,
                subject: subject, 
                html: renderedTemplate,
              });
              return info
}

module.exports = {
    sendMail 
}
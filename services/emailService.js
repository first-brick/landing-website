var nodemailer = require('nodemailer');
require('dotenv').config()

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email_id,
      pass: process.env.email_password
    }
  });
  
module.exports.sendMail = function(mailInfo){
    console.log(transporter.auth)
    console.log("Sending email")
    return new Promise(function(resolve, reject){
        var mailOptions = {
            from: mailInfo.email,
            to: process.env.to,
            cc: process.env.cc.split(','),
            subject: "New Contact message from: "+mailInfo.name+" ("+mailInfo.email+")",
            text: mailInfo.message
          };
          resolve(true)
          transporter.sendMail(mailOptions, function(error, info){
             if (error) {
             console.log(error);
               reject(false)
             } else {
               console.log('Email sent: ' + info.response);
               resolve(true)
             }
           });
    })
}

  

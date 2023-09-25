const nodemailer = require("nodemailer");

const sendEmail = async (mail, subject, text) => {
   try {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "subash.doodleblue@gmail.com",
          pass: "uzycryapzbosttce"
        }
      });

        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       type: 'OAuth2',
        //       user: "subash.doodleblue@gmail.com",
        //       pass: "samsub007",
        //       clientId: "755656838372-7n3uafk51o3ou79mumdq151gl13ige3s.apps.googleusercontent.com",
        //       clientSecret: "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",
        //       refreshToken: "1//04bj_7IeBCWudCgYIARAAGAQSNwF-L9IrBbRrx9UTm8HOtaDF4ZvZuJyG0lwk3C1sspOuEzJTxMlmTaa0ZM5bSG7SxxcPXGc4dEc"
        //     }
        //   });

          //mail trap
         /* try {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
    port: 2525,
     auth: {
        user: "70435e492cce35",//mailtrap id
        pass: "ec3fbd15c35860" 
       }
    });*/


        await transporter.sendMail({
            from: "subash.doodleblue@gmail.com",
            to: mail,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
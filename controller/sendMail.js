// controller/sendMail.js
const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
      return res.status(400).send("Missing required fields: 'to', 'subject', 'text' or 'html'");
  }

  // Generate test SMTP service account from ethereal.email
  let testAccount = await nodemailer.createTestAccount();

  // Create a transporter object using the Ethereal SMTP settings
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Deepa Nikade👻" <deepa@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.json({
    message: 'Email sent successfully!',
    previewUrl: nodemailer.getTestMessageUrl(info),
  });
};

module.exports = sendMail;

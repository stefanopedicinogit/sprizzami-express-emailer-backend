const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.use(express.json());

router.post('/', (req, res) => {
  const { contactName, contactLast, contactEmail, contactPhone, contactMessage } = req.body;

  console.log('LOG: ',contactName, contactLast, contactEmail, contactPhone, contactMessage);
 console.log('req', req.body)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sprizzami.pt@gmail.com',
      pass: 'vuuhlagzwsabxhgj',
    },
  });

  const mailOptions = {
    from: `${contactEmail}`,
    to: 'sprizzami.pt@gmail.com',
    subject: `Message from ${contactName} ${contactLast}`,
    text: `
      Name: ${contactName}
      Last Name: ${contactLast}
      Email: ${contactEmail}
      Phone: ${contactPhone}
      Message: ${contactMessage}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });
});

module.exports = router;

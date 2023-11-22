const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.PASSWORD,
  },
});

const sendVerificationEmail = async (to, verificationLink) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject: 'Email Verification',
    html: `
      <p>Thank you for registering with us!</p>
      <p>Please click the following link to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendPasswordResetEmail = async (to, temporaryPassword) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject: 'Password Reset',
    text: `Your temporary password is: ${temporaryPassword}\nPlease change your password after logging in.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.response);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};

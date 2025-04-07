const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendMail = async (req, res) => {
  const { userMail, userName } = req.body;
  try {
    await transporter.sendMail({
      from: `"DLCF Easter Retreat" <noreply@gmail.com>`,
      to: userMail,
      replyTo: "support@yourdomain.com",
      subject: `Welcome to camp, ${userName}!`,
      html: `
        <h2>Hi ${userName},</h2>
        <p>Welcome! Thanks for registering.</p>
        <p>We’re happy to have you here.</p>
        <p>Be blessed,<br>DLCF</p>
      `,
    });
    console.log("Email sent successfully!");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
};

module.exports = sendMail;

const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

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
  const formData = req.body;

  const emailTemplatePath = path.join(__dirname, "template.html");
  let emailHtml = fs.readFileSync(emailTemplatePath, "utf8"); // Read fresh copy every time

  // Replace placeholders
  emailHtml = emailHtml
    .replace("{{surname}}", formData.surname)
    .replace("{{middleName}}", formData.middleName)
    .replace("{{lastName}}", formData.lastName)
    .replace("{{email}}", formData.email)
    .replace("{{gender}}", formData.gender)
    .replace("{{age}}", formData.age)
    .replace("{{participantType}}", formData.participantType)
    .replace("{{academicLevel}}", formData.academicLevel)
    .replace("{{campus}}", formData.campus)
    .replace("{{otherCampus}}", formData.otherCampus)
    .replace("{{registrationId}}", formData.registrationId)
    .replace("{{registrationLink}}", formData.registrationLink)
    .replace("{{currentYear}}", formData.currentYear);

  try {
    await transporter.sendMail({
      from: `"DLCF Easter Retreat" <noreply@gmail.com>`,
      to: formData.email,
      subject: `Retreat Registration Confirmation`,
      html: emailHtml,
    });
    console.log("Email sent successfully!");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
};

module.exports = sendMail;

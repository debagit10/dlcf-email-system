require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sendMail = require("../src/sendMail");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.post("/sendMail", sendMail);

const startServer = () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

startServer();

// routes/mailRoutes.js
const express = require("express");
const sendMail = require("../controller/sendMail");

const MailRouter = express.Router();
MailRouter.post("/sendMail", sendMail);

module.exports = { MailRouter };

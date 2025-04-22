const express = require("express");
const Nodemiler = require("../controllers/Nodemiler-control");

const router = express.Router();

router.post("/sendemail", Nodemiler.sendEmail);
router.get("/verifyemail", Nodemiler.verify_email);

module.exports = router;

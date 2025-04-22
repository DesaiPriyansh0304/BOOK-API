const express = require("express");
const router = express.Router();
const Password = require("../controllers/Password-control");
const Usermiddelware = require("../middleware/User-middelware");

router.route("/forgotpassword").post(Password.Forgotpassword);
router.route("/changepassword").post(Usermiddelware, Password.Changepassword);
router.route("/resetpassword").post(Password.Resetpassword);

module.exports = router;

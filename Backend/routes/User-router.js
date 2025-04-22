const express = require("express");
const router = express.Router();
const Usercontroller = require("../controllers/User-control");
const Aggregation = require("../controllers/Aggregation-control");
const Bookuser = require("../controllers/Bookuser-control");
const Usermiddelware = require("../middleware/User-middelware");
const validate = require("../middleware/validationn-middelware");
const ZodSchema = require("../validators/User-validation");

router.route("/").get(Usercontroller.Home);

router
  .route("/register")
  .post(validate(ZodSchema.signup), Usercontroller.Register);

router.route("/login").post(validate(ZodSchema.signin), Usercontroller.Login);

router.route("/user").get(Usermiddelware, Usercontroller.UserData);

//*User Booking Data Aggregation
router
  .route("/mybooking/user")
  .get(Usermiddelware, Aggregation.Getalldatauserbook);

//*bookuserdata
router.route("/searchbookuser").get(Bookuser.getIssuedUsersByBookName);

module.exports = router;

const express = require("express");
const router = express.Router();
const Bookissuecontroller = require("../controllers/Bookissue-control");
const Usermiddelware = require("../middleware/User-middelware");

router.route("/bookissue").post(Usermiddelware, Bookissuecontroller.BookForm);

module.exports = router;

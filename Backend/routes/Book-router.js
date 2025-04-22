const express = require("express");
const router = express.Router();
const Bookcontroller = require("../controllers/Book-control");

router.route("/book").get(Bookcontroller.BookData);

module.exports = router;

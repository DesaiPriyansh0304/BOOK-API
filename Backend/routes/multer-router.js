const express = require("express");
const router = express.Router();
// const Usermiddelware = require("../middleware/User-middleware");
const getMulterMiddleware = require("../middleware/multer-middelware");
const multercontroller = require("../controllers/multer-control");

router
  .route("/upload-profile")
  .post(
    getMulterMiddleware("profile").single("profile_avatar"),
    multercontroller.uploadProfile
  );

router.route("/delete-profile").delete(multercontroller.deleteProfile);

router
  .route("/book-img")
  .post(
    getMulterMiddleware("bookimage").single("book_image"),
    multercontroller.bookimage
  );

module.exports = router;

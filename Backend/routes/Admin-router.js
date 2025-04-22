const express = require("express");
const router = express.Router();
const Admin = require("../controllers/Admin-control");
const Usermiddelware = require("../middleware/User-middelware");
const getMulterMiddleware = require("../middleware/multer-middelware");

//*User CRUD
router.route("/users").get(Usermiddelware, Admin.getAllUsers);
router.route("/users/:id").get(Usermiddelware, Admin.edituserid);
router
  .route("/users/update/:id")
  .patch(
    Usermiddelware,
    getMulterMiddleware("profile").single("profile_avatar"),
    Admin.userupdate
  );
router.route("/users/delete/:id").delete(Usermiddelware, Admin.deleteuserid);

//*Book CRUD
router.route("/books").get(Usermiddelware, Admin.getAllbooks);
router.route("/books/:id").get(Usermiddelware, Admin.editbookid);
router
  .route("/books/update/:id")
  .patch(
    Usermiddelware,
    getMulterMiddleware("bookimage").single("book_image"),
    Admin.bookupdate
  );
router.route("/books/delete/:id").delete(Usermiddelware, Admin.deletebookid);

module.exports = router;

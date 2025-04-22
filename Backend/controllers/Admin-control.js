const User = require("../models/User-model");
const Book = require("../models/Book-model");
const path = require("path");
const fs = require("fs");

///*user CRUD
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    // console.log("✌️users --->", users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "DATA NOT FOUND" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const edituserid = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// const userupdate = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const updateUserData = req.body;
//     const updatedata = await User.updateOne(
//       { _id: id },
//       { $set: updateUserData }
//     );
//     return res.status(200).json(updatedata);
//   } catch (error) {
//     next(error);
//   }
// };

const userupdate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //old image remove
    if (req.file) {
      if (user.profile_avatar) {
        const oldPath = path.join(__dirname, "..", user.profile_avatar);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      //new image path store
      const relativePath = req.file.path.replace(/\\/g, "/");
      updateUserData.profile_avatar = relativePath;
    }

    const updatedata = await User.updateOne(
      { _id: id },
      { $set: updateUserData }
    );

    return res.status(200).json(updatedata);
  } catch (error) {
    console.error("Update Error:", error);
    next(error);
  }
};

const deleteuserid = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//bookCRUD
const getAllbooks = async (req, res, next) => {
  try {
    const users = await Book.find({}, { password: 0 });
    // console.log("✌️users --->", users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "DATA NOT FOUND" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const editbookid = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Book.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// const bookupdate = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const updateUserData = req.body;
//     const updatedata = await Book.updateOne(
//       { _id: id },
//       { $set: updateUserData }
//     );
//     return res.status(200).json(updatedata);
//   } catch (error) {
//     next(error);
//   }
// };

const bookupdate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateBookData = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // If new image is uploaded
    if (req.file) {
      // Delete old image if exists
      if (book.image) {
        const oldPath = path.join(__dirname, "..", book.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const relativePath = path
        .relative(path.join(__dirname, ".."), req.file.path)
        .replace(/\\/g, "/");

      updateBookData.image = relativePath;
    }

    const updatedata = await Book.updateOne(
      { _id: id },
      { $set: updateBookData }
    );
    return res.status(200).json(updatedata);
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deletebookid = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Book.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  edituserid,
  deleteuserid,
  userupdate,
  getAllbooks,
  editbookid,
  bookupdate,
  deletebookid,
};

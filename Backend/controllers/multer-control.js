const User = require("../models/User-model");
const Book = require("../models/Book-model");
const fs = require("fs");
const path = require("path");

// Upload profile picture
const uploadProfile = async (req, res) => {
  try {
    const userId = req.body.id;

    const fullPath = req.file.path;

    // Convert to relative path
    const relativePath = path
      .relative(path.join(__dirname, ".."), fullPath)
      .replace(/\\/g, "/");

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete old profile picture if it exists
    if (user.profile_avatar) {
      const oldPath = path.join(__dirname, "..", user.profile_avatar);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    user.profile_avatar = relativePath;
    await user.save();

    res.status(200).json({
      message: "Profile uploaded successfully",
      profile_avatar: relativePath,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete profile picture
const deleteProfile = async (req, res) => {
  try {
    const userId = req.body.id;
    const user = await User.findById(userId);

    if (!user || !user.profile_avatar) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const filePath = path.join(__dirname, "..", user.profile_avatar);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    user.profile_avatar = null;
    await user.save();

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Upload book image
const bookimage = async (req, res) => {
  try {
    const bookId = req.body.id;
    console.log("✌️bookId --->", bookId);

    const fullPath = req.file.path;

    const relativePath = path
      .relative(path.join(__dirname, ".."), fullPath)
      .replace(/\\/g, "/");

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Delete old book image if it exists
    if (book.image) {
      const oldPath = path.join(__dirname, "..", book.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    book.image = relativePath;
    await book.save();

    res.status(200).json({
      message: "Book image uploaded successfully",
      image: relativePath,
    });
  } catch (error) {
    console.error("Upload error (bookimage):", error);
    res.status(500).json({ message: "Server error (bookimage)" });
  }
};

module.exports = { uploadProfile, deleteProfile, bookimage };

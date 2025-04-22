const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  book_name: {
    type: String,
    required: true,
    trim: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

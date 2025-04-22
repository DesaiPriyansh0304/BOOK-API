const mongoose = require("mongoose");

const bookIssueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      // type: Array,
    },
  ],
  issue_date: {
    type: Date,
    required: true,
  },
  submission_date: {
    type: Date,
    required: true,
  },
});

const Bookissue = mongoose.model("Bookissue", bookIssueSchema);
module.exports = Bookissue;

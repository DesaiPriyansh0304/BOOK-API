const Bookissue = require("../models/Bookissue-model");

const BookForm = async (req, res) => {
  try {
    // console.log("✌️req.body --->Bookisuues-controler", req.body);
    const { bookId, issue_date, submission_date } = req.body;

    const Bookdate = await Bookissue.create({
      userId: req.userId,
      bookId: bookId,
      issue_date,
      submission_date,
    });
    // console.log("✌️bookId --->", bookId);

    // console.log("✌️Bookdate --->", Bookdate);
    return res.status(201).json({ msg: Bookdate });
  } catch (error) {
    console.log("BookForm/bookissue-controller", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error/bokissuess-control" });
  }
};

module.exports = { BookForm };

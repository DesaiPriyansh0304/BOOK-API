const Bookissue = require("../models/Bookissue-model");

const getIssuedUsersByBookName = async (req, res) => {
  try {
    const { book_name } = req.query;

    const result = await Bookissue.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "bookData",
        },
      },
      { $unwind: "$bookData" },
      {
        $match: {
          "bookData.book_name": { $regex: book_name, $options: "i" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: "$userData" },
      {
        $group: {
          _id: "$bookData._id",
          book_name: { $first: "$bookData.book_name" },
          author_name: { $first: "$bookData.author_name" },
          semester: { $first: "$bookData.semester" },
          price: { $first: "$bookData.price" },
          image: { $first: "$bookData.image" },
          users: {
            $push: {
              first_name: "$userData.first_name",
              last_name: "$userData.last_name",
              email: "$userData.email",
              profile_avatar: "$userData.profile_avatar",
              issue_date: "$issue_date",
              submission_date: "$submission_date",
            },
          },
        },
      },
    ]);

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Aggregation Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getIssuedUsersByBookName };

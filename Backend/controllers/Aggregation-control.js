const Bookissue = require("../models/Bookissue-model");
const mongoose = require("mongoose");

const Getalldatauserbook = async (req, res) => {
  const userId = req.userId;
  // console.log("✌️userId --->Aggregtion-control.js", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // console.log("Starting aggregation for userId:", userId);
    const userBookings = await Bookissue.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          bookId: 1,
          issue_date: 1,
          submission_date: 1,
          BookDetails: {
            $map: {
              input: "$bookDetails",
              as: "book",
              in: {
                _id: "$$book._id",
                book_name: "$$book.book_name",
                author_name: "$$book.author_name",
                price: "$$book.price",
                image: "$$book.image",
                semester: "$$book.semester",
              },
            },
          },
        },
      },
    ]);

    // console.log("Aggregation result:");
    // console.dir(userBookings, { depth: null });

    if (userBookings.length === 0) {
      console.log(" No bookings found for userId:", userId);
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    // console.log(" Bookings fetched successfully.");
    res.status(200).json({ bookings: userBookings });
  } catch (error) {
    console.error(" Error fetching user bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { Getalldatauserbook };

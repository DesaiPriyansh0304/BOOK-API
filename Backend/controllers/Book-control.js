const Books = require("../models/Book-model");

const BookData = async (req, res) => {
  try {
    const response = await Books.find();
    // console.log("✌️response --->", response);
    res.status(201).json({ msg: response });

    if (!response) {
      res.status(401).json({ msg: "No data Found in BOOKS/BOOK-CONTROLLER" });
    }
  } catch (error) {
    console.log("Book-Controler", error);
    return res.statue(500).json({ msg: "Book/Controler" });
  }
};

module.exports = { BookData };

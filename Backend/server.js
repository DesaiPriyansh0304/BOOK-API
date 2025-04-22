require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const errormiddleware = require("./middleware/error-middelware");

const app = express();

//* Express middleware to parse JSON
app.use(express.json());

///*core
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

//*Router import
const UserRouter = require("./routes/User-router");
const BookRouter = require("./routes/Book-router");
const BookissueRouter = require("./routes/Bookissue-router");
const EmailRouter = require("./routes/email-router");
const PasswordRouter = require("./routes/Password-router");
const MulterRouter = require("./routes/multer-router");
const AdminRouter = require("./routes/Admin-router");

//*Mount Routers
app.use("/api/auth", UserRouter);
app.use("/api/books", BookRouter);
app.use("/api/books", BookissueRouter);
app.use("/api/email", EmailRouter);
app.use("/api/password", PasswordRouter);
app.use("/api/upload", MulterRouter);
app.use("/api/admin", AdminRouter);

///*Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use(errormiddleware);

//sever port
const PORT = 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
  });
});

const User = require("../models/User-model");
const jwt = require("jsonwebtoken");

const Usermiddelware = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log("✌️token --->USER MIDDLEWARE", token);

  if (!token) {
    return res.status(401).json({ msg: "Token Not Provider /USER_MIDDELWARE" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVarified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: isVarified.email }).select({
      password: 0,
    });

    // console.log("✌️userData --->", userData);
    if (!userData) {
      return res.status(402).json({ msg: "User not found" });
    }

    req.user = userData;
    req.token = token;
    // console.log("✌️token --->", token);
    req.userId = userData._id.toString();
    // console.log("✌️userData --->", userData?._id);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(500).json({ msg: "token/user not found" });
  }
};

module.exports = Usermiddelware;

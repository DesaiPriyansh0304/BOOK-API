const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, isAdmin: user.isadmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;

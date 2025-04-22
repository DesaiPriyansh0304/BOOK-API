const User = require("../models/User-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmailUtil = require("../utils/Nodemailerutil");
const generateToken = require("../utils/generateToken");

const Forgotpassword = async (req, res) => {
  const { email } = req.body;
  // console.log('✌️req.body --->', req.body);

  try {
    const user = await User.findOne({ email });
    // console.log("✌️user --->", user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = generateToken(user);

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    await sendEmailUtil({
      to: user.email,
      subject: "Password Reset",
      text: `Click this link to reset your password: ${resetLink}`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error });
  }
};

const Resetpassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error });
  }
};

const Changepassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: req.user.email }); // Get email from middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error });
  }
};

module.exports = { Forgotpassword, Changepassword, Resetpassword };

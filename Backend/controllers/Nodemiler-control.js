const sendEmailUtil = require("../utils/Nodemailerutil");
const User = require("../models/User-model");

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  // console.log("✌️req.body --->", req.body);

  try {
    await sendEmailUtil({ to, subject, text });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email", error });
  }
};

const verify_email = async (req, res) => {
  try {
    const { token } = req.query;
    // console.log("token/verify_email --->", token);

    const user = await User.findOne({ verification_token: token });
    // console.log("✌️user --->", user);

    if (!user) {
      return res.status(401).json({ msg: "Invalid or expired token/user" });
    }

    if (!user) {
      return res.status(401).send(`
        <h1 style="color: red;">Invalid or expired token.</h1>
        <a href="http://localhost:5173/">
          <button style="padding: 10px 20px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer;">Back to Home Page</button>
        </a>
      `);
    }

    user.is_verified = true;
    user.verification_token = "";
    // console.log("✌️user.verification_token --->", user.verification_token);
    await user.save();

    res.send(`
      <h1 style="color: green;">Email verification successful 🎉</h1>
      <a href="http://localhost:5173/">
        <button style="padding: 10px 20px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer;">Back to Home Page</button>
      </a>
    `);
    res.json({ status: "Email verification successful 🎉" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { sendEmail, verify_email };

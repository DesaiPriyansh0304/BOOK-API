const User = require("../models/User-model");
const generateToken = require("../utils/generateToken");
const sendEmailUtil = require("../utils/Nodemailerutil");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

//*Home Controller
const Home = async (req, res) => {
  try {
    res.status(201).send("Home User-control");
  } catch (error) {
    console.log("Error in server../User-control", error);
  }
};

//*Register Controller
// const Register = async (req, res) => {
//   try {
//     const { first_name, last_name, email, password, profile_avatar } = req.body;
//     // console.log("✌️req.body --->", req.body);

//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({ message: "Email already exists." });
//     }

//     //hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const userCreated = await User.create({
//       first_name,
//       last_name,
//       email,
//       password: hashedPassword,
//       profile_avatar,
//       verification_token,
//       is_verified: false,
//     });

//     // console.log("✌️userCreated --->/register-control", userCreated);
//     // Generate verification token
//     const verification_token = crypto.randomBytes(32).toString("hex");
//     console.log("Verification token generated:", verification_token);

//     // Send verification email
//     const verificationUrl = `http://localhost:8000/api/email/verifyemail?token=${verification_token}`;
//     await sendEmailUtil({
//       to: email,
//       subject: "Verify Your Email",
//       text: `Hi ${first_name},\n\nClick the link below to verify your email:\n${verificationUrl}\n\nThanks,\nBook API `,
//     });

//     // console.log("Token stored in DB:", userCreated.verification_token);

//     res.status(201).json({
//       msg: "Registration successful. Check your email to verify your account.",
//       token: generateToken(userCreated),
//       userId: userCreated._id.toString(),
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({ message: "Internal server error  registration" });
//   }
// };

const Register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, profile_avatar } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Generate verification token BEFORE using it
    const verification_token = crypto.randomBytes(32).toString("hex");
    console.log("Verification token generated:", verification_token);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      profile_avatar,
      verification_token,
      is_verified: false,
    });

    // Send verification email
    const verificationUrl = `http://localhost:8000/api/email/verifyemail?token=${verification_token}`;
    await sendEmailUtil({
      to: email,
      subject: "Verify Your Email",
      text: `Hi ${first_name},\n\nClick the link below to verify your email:\n${verificationUrl}\n\nThanks,\nBook API `,
    });

    res.status(201).json({
      msg: "Registration successful. Check your email to verify your account.",
      token: generateToken(userCreated),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error  registration" });
  }
};

//*Login Controller
const Login = async (req, res) => {
  try {
    // console.log("✌️req.body --->Login", req.body);
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "User not found." });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password." });
    }

    // Optional: Check if email is verified
    if (!userExist.is_verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first." });
    }

    res.status(200).json({
      msg: "Login Successful",
      token: generateToken(userExist),
      userId: userExist._id.toString(),
    });
    // console.log("✌️userExist --->", userExist);
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Internal server error during login.");
  }
};

//*User Controller
const UserData = async (req, res) => {
  try {
    const userData = req.user;
    // console.log("✌️userData --->", userData);
    return res.status(201).json({ userData });
  } catch (error) {
    res.status(500).send("Internal User Controler.");
    console.log("userdata/USER_CONTROL", error);
  }
};

module.exports = {
  Home,
  Register,
  Login,
  UserData,
};

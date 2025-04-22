const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, default: false },
  profile_avatar: { type: String }, // Avatar URL
  verification_token: { type: String },
  is_verified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

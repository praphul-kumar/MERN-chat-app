const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  avatar: { type: String, required: true, default: "https://i.pravatar.cc/150" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
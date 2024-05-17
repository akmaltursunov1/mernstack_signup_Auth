const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "ismni kiriting"],
    },
    email: {
      type: String,
      required: [true, "emailni kiriting"],
    },
    password: {
      type: String,
      required: [true, "parolni kiriting"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timesTamps: true }
);

module.exports = mongoose.model("userModel", userSchema);

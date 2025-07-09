const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    companyName: {
      type: String,
    },
    logoUrl: {
      type: String,
      default: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Avery",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

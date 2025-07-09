const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // so each client is linked to the user who created them
    },
    name: {
      type: String,
      required: [true, "Client name is required"],
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    gstNumber: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);

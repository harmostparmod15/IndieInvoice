const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    invoiceNumber: { type: String, required: true, unique: true },
    services: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    taxRate: { type: Number, default: 0 },
    discount: {
      type: { type: String, enum: ["flat", "percent"], default: "flat" },
      value: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Overdue"],
      default: "Unpaid",
    },
    invoiceDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    totalAmount: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);

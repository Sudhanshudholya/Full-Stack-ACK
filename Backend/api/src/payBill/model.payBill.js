
const mongoose = require("mongoose");

// Define schema for PayBill
const payBillSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice", // Reference to Invoice model
    required: true, // This is necessary to link the payment to an invoice
  },
  payBill: {
    type: Number,
    required: true, // The payment amount is required
  },
  amountPaid: {
    type: Number,
    required: true, // Amount actually paid by the user
  },
  paymentDate: {
    type: Date,
    default: Date.now, // Timestamp of when payment was made
  },
  paymentMethod: {
    type: String,
    default: "Cash", // Default payment method (You can extend this to UPI, Credit, etc.)
  },
});

// Create model for PayBill
const PayBill = mongoose.model("PayBill", payBillSchema);

module.exports = PayBill;

// model.invoiceNumber.js
const mongoose = require("mongoose");

const invoiceNumberSchema = new mongoose.Schema({
  currentInvoiceNo: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("InvoiceNumber", invoiceNumberSchema);

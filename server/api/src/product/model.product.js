const mongoose = require("mongoose");
const productShcema = mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    product_Name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    mrp: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("product", productShcema);

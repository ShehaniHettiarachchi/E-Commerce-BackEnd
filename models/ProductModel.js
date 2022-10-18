const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  productPrice: {
    type: Number,
    required: [true, "Please enter your product price"],
  },
  productImage: {
    type: String,
    required: [true, "Please enter your product image"],
  },
  userId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
 });

const Cart = mongoose.model("Product", productSchema);
module.exports = { Product };
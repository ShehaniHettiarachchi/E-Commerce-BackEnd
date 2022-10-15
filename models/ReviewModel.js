const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  productId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    maxLength: [500, "Review cannot exceed 500 characters"],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = { Review };

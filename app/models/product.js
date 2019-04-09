const mongoose = require("mongoose");
const { reviewSchema } = require("./review");
const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true,
    minlength: 5
  },
  price: {
    type: Number,
    minlength: 1,
    required: true
  },
  stock: {
    type: Number,
    minlength: 1
  },
  isCod: {
    type: Boolean,
    default: true,
    required: true
  },
  avilableFrom: {
    type: Date,
    default: Date.now
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  review: [reviewSchema]
});
const Product = mongoose.model("Product", productSchema);
module.exports = {
  Product
};

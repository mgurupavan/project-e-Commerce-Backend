const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  orderAt: {
    type: Date,
    default: Date.now
  },
  orderNumber: {
    type: String,
    required: true
  },
  totalOrders: {
    type: Number,
    required: true
  },
  lineItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number
      },
      price: {
        type: Number
      }
    }
  ]
  // lineItems: []
});
const Order = mongoose.model("Order", orderSchema);
module.exports = {
  orderSchema,
  Order
};

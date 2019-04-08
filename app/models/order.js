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
    type: String
  },
  total: {
    type: Number
  },
  lineItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product"
      },
      quantity: {
        type: Number,
        min: 1
      },
      price: {
        type: Number
      }
    }
  ]
});
const Order = mongoose.model("Order", orderSchema);
module.exports = {
  Order,
  orderSchema
};

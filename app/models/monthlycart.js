const mongoose = require("mongoose");
const { Schema } = mongoose;
const monthlyCartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
    //required: true
  },
  quantity: {
    type: Number,
    min: 1,
    max: 50
    //	required:true
  }
});
const Monthly = mongoose.model("Monthly", monthlyCartSchema);
monthlyCartSchema.pre("save", function(next) {
  // console.log("its move to order");
  next();
});
module.exports = { Monthly, monthlyCartSchema };

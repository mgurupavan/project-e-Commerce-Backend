const { mongoose } = require("../config/db_connect");
const { Category } = require("../app/models/category");
const { Product } = require("../app/models/product");

Promise.all([Category.deleteMany({}), Product.deleteMany({})]).then(() => {
  console.log("cleared db data");
  mongoose.connection.close();
});

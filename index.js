const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("./config/db_connect");
const { categoryController } = require("./app/controllers/category_controller");
const { productController } = require("./app/controllers/product_controller");
const { userController } = require("./app/controllers/user_controller");
const { reviewController } = require("./app/controllers/review_controller");
const { cartController } = require("./app/controllers/cart_controller");
const {
  monthlyCartController
} = require("./app/controllers/monthly_controller");
const { addressController } = require("./app/controllers/address_controller");
const { orderController } = require("./app/controllers/order_controller");
app.use(express.json());
app.use(cors());
app.use("/public/uploads", express.static("public/uploads"));
app.use("/categories", categoryController);
app.use("/products", productController);
app.use("/reviews", reviewController);
app.use("/carts", cartController);
app.use("/monthlycarts", monthlyCartController);
app.use("/addresses", addressController);
app.use("/orders", orderController);
app.use("/users", userController);
app.get("/", (req, res) => {
  res.send("Welcome to your E-Commerce");
});
app.use(function(req, res) {
  // res.sendStatus(404);
  res.status(404);
  res.send(
    "The resource you are looking for doesn’t exist." + "\n Not Found " + 404
  );
});

app.listen(port, () => {
  console.log("listining from", port);
});

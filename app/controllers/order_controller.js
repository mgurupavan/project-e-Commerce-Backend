const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Order } = require("../models/order");
const { authentication } = require("./middlewares/authenticate");

router.get("/", authentication, (req, res) => {
  const user = req.user;
  User.orderHistory.find().then(order => {
    res.send(order);
  });
  // User.findone().then(data => {
  //   res.send(data);
  // });
  //console.log(user.orderHistory[0].lineItems);
  //res.send();
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Order.findOne({
    _id: id
  })
    .then(order => {
      res.send(order);
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/", authentication, (req, res) => {
  const user = req.user;
  const body = req.body;
  const order = new Order(body);
  let lineItems = [];

  user.cart.forEach(cart => {
    const obj = Object.assign(
      {},
      { product: cart.product, quantity: cart.quantity }
    );
    if (obj.product) {
      lineItems.push(obj);
    }
  });
  // console.log(lineItems);
  order.lineItems = lineItems;
  user.orderHistory.push(order);
  // console.log(user.cart);
  // user.orderHistory.push(order);
  user.cart = [];
  user
    .save()
    .then(() => {
      res.send({ statusText: "succesfully pushed to cart" });
    })
    .catch(err => {
      res.send(err);
    });
});
module.exports = {
  orderController: router
};

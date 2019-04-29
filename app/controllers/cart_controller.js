const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart");
const { User } = require("../models/user");
const { authentication } = require("./middlewares/authenticate");

router.get("/", authentication, (req, res) => {
  const user = req.user;
  User.findOne(user._id)
    .select("cart")
    .populate("cart.product")
    .then(cart => {
      res.send(cart);
    });
});
router.get("/:id", authentication, (req, res) => {
  const cartId = req.params.id;
  const cart = req.user.cart;
  cart.forEach(cartItem => {
    if (cartItem._id == cartId) {
      res.send(cartItem);
    }
  });
});
router.post("/", authentication, (req, res) => {
  const body = req.body;
  const user = req.user;
  const cart = new Cart(body, user._id);
  let product = false;
  user.cart.map(productId => {
    if (productId.product == body.product) {
      product = true;
    }
  });
  if (product) {
    res.send({ statusText: "you already added this product to cart" });
  } else {
    user.cart.push(cart);
    user
      .save()
      .then(user => {
        res.send({ statusText: "Added Successfully" });
      })
      .catch(err => {
        res.status(403).send({
          statusText: "You are not authorized to access this URL"
        });
      });
  }
});

router.put("/:id", authentication, (req, res) => {
  const user = req.user;
  const body = req.body;
  const id = req.params.id;
  user.cart.forEach(cart => {
    if (cart._id == id) {
      cart.quantity = body.quantity;
    }
  });

  user
    .save()
    .then(user => {
      res.send({ statusText: "successfully Updated" });
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/:id", authentication, (req, res) => {
  const user = req.user;
  const id = req.params.id;
  user.cart = user.cart.filter(cart => {
    return cart._id != id;
  });
  user.save().then(user => {
    res.send({ statusText: "successfully deleted" });
  });
});
module.exports = {
  cartController: router
};

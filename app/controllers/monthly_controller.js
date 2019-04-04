const express = require("express");
const router = express.Router();
const { Monthly } = require("../models/monthlycart");
const { Product } = require("../models/product");
const { authentication } = require("./middlewares/authenticate");

router.get("/", authentication, (req, res) => {
  const user = req.user;
  res.send(user.monthlyCart);
});

router.post("/", authentication, (req, res) => {
  const body = req.body;
  const user = req.user;
  let dum = false;

  const monthly = new Monthly(body, user._id);
  user.monthlyCart.map(product => {
    if (product.product == body.product) {
      dum = true;
    }
  });

  if (dum) {
    res.send({ statusText: "already created" });
  } else {
    user.monthlyCart.push(monthly);
    user
      .save()
      .then(user => {
        res.send({
          statusText: "added to cart successfully",
          monthlyCart: user.monthlyCart
        });
      })
      .catch(err => {
        res.send(err);
      });
  }
});

router.put("/:id", authentication, (req, res) => {
  const user = req.user;
  const body = req.body;
  const id = req.params.id;
  user.monthlyCart.forEach(monthlyCart => {
    if (monthlyCart._id == id) {
      monthlyCart.quantity = body.quantity;
    }
  });
  user
    .save()
    .then(user => {
      res.send(user.monthlyCart);
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/:id", authentication, (req, res) => {
  const user = req.user;
  const id = req.params.id;
  user.monthlyCart = user.monthlyCart.filter(monthlyCart => {
    return monthlyCart._id != id;
  });

  //console.log(user.cart);
  user
    .save()
    .then(user => {
      //  console.log(user.cart);
      res.send({
        statusText: "succesfully deleted",
        monthlyCart: user.monthlyCart
      });
    })
    .catch(err => {
      res.send(err);
    });
});
module.exports = {
  monthlyCartController: router
};

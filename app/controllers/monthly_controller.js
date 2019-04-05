const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Monthly } = require("../models/monthlycart");
const { authentication } = require("./middlewares/authenticate");

router.get("/", authentication, (req, res) => {
  const user = req.user;
  //console.log(user);
  User.findOne(user._id)
    .select("monthlyCart")
    .populate("monthlyCart.product")
    .then(monthly => {
      res.send(monthly);
    });
});
router.get("/:id", authentication, (req, res) => {
  const monthlyCartId = req.params.id;
  const monthly = req.user.monthlyCart;

  monthly.forEach(monthlyCartItem => {
    if (monthlyCartItem._id == monthlyCartId) {
      res.send(monthlyCartItem);
    }
  });
});
router.post("/", authentication, (req, res) => {
  const body = req.body;
  const user = req.user;
  const monthlyCart = new Monthly(body);

  let product = false;
  user.monthlyCart.map(productId => {
    if (productId.product == body.product) {
      product = true;
    }
  });
  if (product) {
    res.send({ statusText: "you already added to monthlycart" });
  } else {
    user.monthlyCart.push(monthlyCart);
    user
      .save()
      .then(user => {
        res.send({ statusText: "Added Succesfully", monthlyCart });
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

  user.monthlyCart.forEach(monthlyCart => {
    if (monthlyCart.product == id) {
      monthlyCart.quantity = body.quantity;
    }
  });

  user
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/:id", authentication, (req, res) => {
  const user = req.user;
  const id = req.params.id;
  user.monthlyCart = user.monthlyCart.filter(monthlycart => {
    return monthlycart._id != id;
  });
  user.save().then(user => {
    res.send({
      statusText: "successfully deleted",
      monthlyCart: user.monthlyCart
    });
  });
});
module.exports = {
  monthlyCartController: router
};

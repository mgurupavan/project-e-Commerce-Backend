const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const { authentication } = require("./middlewares/authenticate");
const { authorizationByAdmin } = require("./middlewares/authorization");
const { Product } = require("../models/product");

router.get("/", (req, res) => {
  Category.find()
    .then(category => {
      if (category.length != 0) {
        res.send(category);
      } else {
        res.send([]);
      }
    })
    .catch(err => {
      res.send(err);
    });
});
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Promise.all([
    Category.findOne({ _id: id }),
    Product.find({ category: id })
  ]).then(values => {
    res.send({
      category: values[0],
      products: values[1]
    });
  });
});

router.post("/", (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then(category => {
      res.send(category);
    })
    .catch(err => {
      res.send(err);
    });
});
router.put("/:id", (req, res) => {
  Category.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: req.body
    },
    {
      new: true
    }
  )
    .then(category => {
      res.send(category);
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/:id", (req, res) => {
  Category.findOneAndDelete({ _id: req.params.id })
    .then(category => {
      res.send(category);
    })
    .catch(err => {
      res.send(err);
    });
});
module.exports = {
  categoryController: router
};

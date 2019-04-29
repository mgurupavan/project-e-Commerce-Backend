const express = require("express");
const router = express.Router();
const { Review } = require("../models/review");
const { authentication } = require("../controllers/middlewares/authenticate");
router.get("/", (req, res) => {
  Review.find()
    .populate("user")
    .then(review => {
      if (review.length != 0) {
        res.send(review);
      } else {
        res.send({ statsText: "There is no Reviews" });
      }
    })
    .catch(err => {
      res.send(err);
    });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Review.findOne({ _id: id })
    .then(review => {
      res.send(review);
    })
    .catch(err => {
      res.send(err);
    });
});
router.post("/", authentication, (req, res) => {
  const user = req.user;
  const review = new Review(req.body, user._id);

  review
    .save()
    .then(review => {
      res.send({ statusText: "successfully review created" });
    })
    .catch(err => {
      res.send(err);
    });
});

router.put("/:id", authentication, (req, res) => {
  const user = req.user;
  Review.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: user._id
    },
    {
      $set: req.body
    },
    {
      new: true
    }
  )
    .then(review => {
      res.send(review);
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/:id", authentication, (req, res) => {
  const user = req.user;
  Review.findOneAndDelete({ _id: req.params.id, userId: user._id })
    .then(review => {
      res.send(review);
    })
    .catch(err => {
      res.send(err);
    });
});
module.exports = {
  reviewController: router
};

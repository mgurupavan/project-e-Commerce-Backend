const express = require("express");
const router = express.Router();
const { Review } = require("../models/review");
const {
  authenticationByUser
} = require("../controllers/middlewares/authenticate");
router.get("/", (req, res) => {
  Review.find()
    .then(review => {
      if (review.length != 0) {
        res.send(review);
      } else {
        res.send([]);
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
router.post("/", (req, res) => {
  const review = new Review(req.body);

  review
    .save()
    .then(review => {
      res.send(review);
    })
    .catch(err => {
      res.send(err);
    });
});

router.put("/:id", (req, res) => {
  Review.findOneAndUpdate(
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
    .then(review => {
      res.send(review);
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/:id", (req, res) => {
  Review.findOneAndDelete({ _id: req.params.id })
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

const express = require("express");
const router = express.Router();
const { authentication } = require("./middlewares/authenticate");
const { User } = require("../models/user");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.send(err);
    });
});
router.post("/login", (req, res) => {
  const body = req.body;

  //static method
  User.findByCredentials(body.email, body.password)
    .then(user => {
      //instance method
      return user.generateByToken();
      //res.send(" successfully logedin ");
    })
    .then(token => {
      //res.header("x-auth", token).send()
      res.send(token);
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/logout", authentication, (req, res) => {
  const tokenData = req.token;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { tokens: { token: tokenData } } }
  )
    .then(user => {
      user.save().then(user => {
        res.send({ statusText: "successfully logout" });
      });
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/logoutall", authentication, (req, res) => {
  let token = req.token;
  User.findOneAndUpdate({ _id: req.user._id }, { $set: { tokens: [] } })
    .then(user => {
      user.save().then(user => {
        res.send({ statusText: "successfully logout from all devices" });
      });
    })
    .catch(err => {
      res.send(err);
    });
});
router.get("/", (req, res) => {
  const id = req.params.id;
  User.find()
    .select("order")
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = {
  userController: router
};

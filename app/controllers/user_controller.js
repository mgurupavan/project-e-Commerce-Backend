const express = require("express");
const router = express.Router();
const { authentication } = require("./middlewares/authenticate");
const { authorizationByAdmin } = require("./middlewares/authorization");
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
      //res.header("x-auth", token).send();
      res.send(token);
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/logout", authentication, (req, res) => {
  const tokenData = req.token;
  console.log(1);
  console.log(req.user);
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { tokens: { token: tokenData } } }
  )
    .then(user => {
      user.save().then(user => {
        res.send("suceessfully logout");
      });
    })
    .catch(err => {
      res.send(err);
    });
});
router.delete("/logoutall", (req, res) => {
  let token = req.token;
  User.findOneAndUpdate(
    { _id: req.user._id },
    //{ $pull: { tokens: { token: token } } },
    { $set: { tokens: [] } }
  )
    .then(user => {
      // 	for (let i = 0; i < user.tokens.length; i++) {
      // 		if (token == user.tokens[i].token) {
      // 			user.tokens.splice(0);
      // 		}
      // 	}
      user.save().then(user => {
        res.send("suceessfully logout from all devices");
      });
    })
    .catch(err => {
      res.send(err);
    });
});
router.get("/", (req, res) => {
  User.find()
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

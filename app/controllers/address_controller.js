const express = require("express");
const router = express.Router();
const { Address } = require("../models/address");
const { authenticationByUser } = require("./middlewares/authenticate");
const { check } = require("express-validator/check");
const { sanitize } = require("express-validator/filter");
router.get("/", (req, res) => {
	Address.find()
		.then(address => {
			if (address.length != 0) {
				res.send(address);
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

	Address.findOne({ _id: id })
		.then(address => {
			res.send(address);
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/", (req, res) => {
	const address = new Address(req.body);

	address
		.save()
		.then(address => {
			res.send(address);
		})
		.catch(err => {
			res.send(err);
		});
});

router.put("/:id", (req, res) => {
	Address.findOneAndUpdate(
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
		.then(address => {
			res.send(address);
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/:id", (req, res) => {
	Address.findOneAndDelete({ _id: req.params.id })
		.then(address => {
			res.send(address);
		})
		.catch(err => {
			res.send(err);
		});
});
module.exports = {
	addressController: router
};

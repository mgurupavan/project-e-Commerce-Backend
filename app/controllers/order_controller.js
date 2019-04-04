const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const { authenticationByUser } = require("./middlewares/authenticate");
router.get("/", (req, res) => {
	Order.find()
		.then(order => {
			if (order.length != 0) {
				res.send(order);
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
module.exports = {
	orderController: router
};

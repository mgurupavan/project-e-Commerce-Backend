const express = require("express");
const multer = require("multer");
//var upload = multer({ dest: "uploads/" }); //anthor way to upload
const router = express.Router();
const path = require("path");
const { Product } = require("../models/product");
const { authentication } = require("../controllers/middlewares/authenticate");
const { Category } = require("../models/category");
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    //with out function callback use directely destination:"./public/uploads/"
    callback(null, "./public/uploads/");
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  }
});
// function fileFilter(req, file, callback) {
// 	if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
// 		// To accept the file pass `true`, like so:
// 		callback(null, true);
// 	} else {
// 		// To reject this file pass `false`, like so:
// 		callback(null, false);
// 	}
// 	// You can always pass an error if something goes wrong:
// 	callback(new Error("check image logic once"));
// }
var upload = multer(
  { storage },
  { limits: { fileSize: 1024 * 1024 * 5 } }
  //{ fileFilter }
);

router.get("/", (req, res) => {
  Product.find()
    //.select("name") //select particuler fieldset
    .populate("category") // give all category filds
    .then(products => {
      res.send(products);
    });
  // Product.find()
  // 	.then(product => {
  // 		if (product.length != 0) {
  // 			res.send(product);
  // 		} else {
  // 			res.send([]);
  // 		}
  // 	})
  // 	.catch(err => {
  // 		res.send(err);
  // 	});
});
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .populate("category")
    .then(product => {
      res.send(product);
    })
    // const id = req.params.id;
    // // Promise.all([
    // // 	Category.findOne({ _id: id }),
    // // 	Product.find({ category: id })
    // // ]).then(values => {
    // // 	res.send({
    // // 		category: values[0],
    // // 		products: values[1]
    // // 	});
    // // });

    .catch(err => {
      res.send(err);
    });
});
router.post("/", authentication, upload.single("imageUrl"), (req, res) => {
  const dest = req.file.destination;
  const imagePath = "http://localhost:3001" + dest.slice(1) + req.file.filename;
  const user = req.user;
  const product = new Product(
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      isCod: req.body.isCod,
      category: req.body.category,
      imageUrl: imagePath
    },
    { _id: user._id }
  );

  product
    .save()
    .then(product => {
      res.send(product);
    })
    .catch(err => {
      res.status(500).send({ statusText: "internal server error" });
    });
});

router.put("/:id", authentication, upload.single("imageUrl"), (req, res) => {
  const image = req.file.imageUrl;

  const user = req.user;
  Product.findOneAndUpdate(
    // { userId: user._id },
    {
      _id: req.params.id
    },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        isCod: req.body.isCod,
        category: req.body.category,
        image
      }
    },
    {
      new: true
    }
  )
    .then(product => {
      res.send(product);
    })
    .catch(err => {
      res.status(500).send({ statusText: "internal server error" });
    });
});
router.delete("/:id", authentication, (req, res) => {
  const user = req.user;
  Product.findOneAndDelete({ _id: req.params.id }, user._id)
    .then(product => {
      res.send(product);
    })
    .catch(err => {
      res.status(500).send({ statusText: "internal server error" });
    });
});

module.exports = {
  productController: router
};

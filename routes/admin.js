const { Router } = require("express");

const router = new Router();

const productsController = require("../controllers/products");

router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

module.exports = router;

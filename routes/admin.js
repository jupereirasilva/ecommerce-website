const { Router } = require("express");

const router = new Router();

const adminController = require("../controllers/admin");

router.get("/add-product", adminController.getAddProduct);

router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postAddProduct);

module.exports = router;

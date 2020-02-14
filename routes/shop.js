const path = require("path");

const { Router } = require("express");

const router = new Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  console.log(adminData.products); // shares data across users !
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
});

module.exports = router;

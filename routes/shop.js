const path = require("path");
const express = require("express");

// const { Router } = require("express");

// const router = new Router();

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
});

module.exports = router;

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
require("dotenv").config();
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.get404);

sequelize
  .sync()
  .then(result => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Listening on port ${port}!`));
  })
  .catch(err => console.log(err));

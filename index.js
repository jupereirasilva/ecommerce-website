const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5e81e3b77c4b803c0866fdd6")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.get404);

mongoConnect(() => {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Listening on port ${port}!`));
});

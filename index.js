const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5e8495af3e8146668b93d3d9")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRouter);
app.use(shopRouter);
app.use(authRouter);

app.use(errorController.get404);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Juliana",
          email: "test@test.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Listening on port ${port}!`));
  })
  .catch(err => console.log(err));

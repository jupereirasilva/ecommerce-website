const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: process.env.CONNECTION_STRING,
  collection: "sessions",
});

app.set("view engine", "pug");
app.set("views", "views");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRouter);
app.use(shopRouter);
app.use(authRouter);

app.use(errorController.get404);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Listening on port ${port}!`));
  })
  .catch((err) => console.log(err));

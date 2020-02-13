const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

// const jsonParser = bodyParser.json();
// app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}!`));

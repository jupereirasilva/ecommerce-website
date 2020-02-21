const fs = require("fs");
const path = require("path");

const product = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = callback => {
  fs.readFile(product, (error, fileData) => {
    if (error) {
      callback([]);
    } else {
      callback(JSON.parse(fileData));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(product, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};

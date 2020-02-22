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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = new Date().getTime().toString();
  }

  save() {
    // this.id = Math.random().toString();
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

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      callback(product);
    });
  }
};

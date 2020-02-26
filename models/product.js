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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(product, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = new Date().getTime().toString();
        products.push(this);
        fs.writeFile(product, JSON.stringify(products), err => {
          console.log(err);
        });
      }
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

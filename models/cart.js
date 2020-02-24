const fs = require("fs");
const path = require("path");

const product = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(product, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart -> find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(product, JSON.stringify(cart), error => {
        console.log(error);
      });
    });
  }
};

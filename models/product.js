const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(id, title, price, description, imageUrl) {
    this._id = new mongodb.ObjectId(id);
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // update product
      dbOperation = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection("products").insertOne(this);
    }
    return dbOperation
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        console.log("PRODUCTS", products);
        return products;
      })
      .catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log("PRODUCT", product);
        return product;
      })
      .catch(err => console.log(err));
  }
}

module.exports = Product;

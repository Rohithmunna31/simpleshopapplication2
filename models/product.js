const db = require("../util/database.js");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT into products(title,price,imageUrl,description) values(?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.execute("select * from Products");
  }

  static findId(id) {
    return db.execute("SELECT * from products where products.id =?"[id]);
  }
};

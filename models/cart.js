const { log } = require("console");
const fs = require("fs");

const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class cart {
  static addProduct(id, prodPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existProd = cart.products.find((prod) => prod.id === id);
      let updatedprod;
      if (existProd) {
        updatedprod = { ...existProd };
        updatedprod.qty = updatedprod.qty + 1;
        cart.products = { ...cart.products };
        cart.products[existProd] = updatedprod;
      } else {
        updatedprod = { id: id, qty: 1 };
        cart.products = { ...cart.products, updatedprod };
      }
      cart.totalPrice = cart.totalPrice + prodPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};

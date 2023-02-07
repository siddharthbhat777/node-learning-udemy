const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    /* 
    Why do we use '?' instead of directly putting data? 
    - '?' is a security measure by MySQL, where it first gets the data, then verifies if there is
      any suspecious value and then it puts it automatically in place of '?'
      e.g. SQL Injection
    */
    return db.execute( // 'id' specified automatically by MySQL
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    ); 
  }

  static deleteById(id) {
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products'); // getting all data
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};

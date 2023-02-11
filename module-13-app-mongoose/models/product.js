const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

/*
- 'Product' is what you will call it all over your project. It's just like alias.
- And normally the collection name in database will be displayed as 'products', as it converts
  'Product' to all small case and in plural form, the reason it puts name as 'products'
*/

module.exports = mongoose.model('Product', productSchema);

/*
Why to create a Schema in NO-SQL?
- We don't actually need any schema when we are creating models with a default method i.e. using 
  mongoDB Driver(module-12)
- As now we are using mongoose which will manage most of the stuffs for us, and will let us focus
  more over our data. To do so, mongoose atleast needs to know how our data actually looks like,
  so for that reason we define a structure of our data for mongoose.
- This dosen't mean our data is not flexible, we can still fill half of the data and keep other data
  as blank (which is called partial tolerance) unless we don't mention required attribute there.
*/

// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp.then((result) => {
//       console.log(result);
//     }).catch((err) => {
//       console.log(err);
//     });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray().then((products) => {
//       console.log(products);
//       return products;
//     }).catch((err) => {
//       console.log(err);
//     });
//     /*
//     toArray(): takes all of your data onto an array to display them at once
//     - only use it if you know your data is limited upto hundreds
//     - if the data is huge then prefer pagination
//     */
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next().then((product) => {
//       console.log(product);
//       return product;
//     }).catch((err) => {
//       console.log(err);
//     });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) }).then((result) => {
//       console.log("Deleted");
//     }).catch((err) => {
//       console.log(err);
//     });
//   }
// }

// module.exports = Product;
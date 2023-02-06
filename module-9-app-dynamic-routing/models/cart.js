const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
    // Why not created constructor?
    /* Because don't want to create create different carts dor different products */
    /* So as to make cart as common for all products, we will create a method */
    static addProduct(id, productPrice) {
        // Fetch previous cart items
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            // error = there is no item in cart / cart not exist
            if (!err) {
                // if no error then convert JSON to JavaScript Object and retrieve all items in cart array
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart => Find existing product
            /* Meaning - check if same product exist in cart */
            /* Line below states that - IF(it already exist) => then give the existing product index */
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id /* checking if the product is already there */);
            /* Output(existingProductIndex) - if product/cart does not exist = -1(false) */
            /* Output(existingProductIndex) - if item in cart exist = 0/1/etc. (index of item) */
            const existingProduct = cart.products[existingProductIndex]; // Referring existing product with its index
            /* Output(existingProduct) - if cart does not exist = undefined */
            /* Output(existingProduct) - if item in cart exist = { id: '13143', qty: 2 } */

            // Add product / increase quantity
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct }; // { id: '13143', qty: 1 }
                updatedProduct.qty = updatedProduct.qty + 1; // { id: '13143', qty: 2 }
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct; // Replace existing details with updated
                // { id: '13143', qty: 1 } = { id: '13143', qty: 2 }
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            // All products price evaluation in cart
            cart.totalPrice = cart.totalPrice + +productPrice;

            // Update cart in JSON file
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err); // if printed null meaning there is no error
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err); // if printed null meaning there is no error
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}
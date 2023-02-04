const products = [];

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        products.push(this); // this is the parameter of constructor
    }

    static fetchAll() {
        return products;
    }
}
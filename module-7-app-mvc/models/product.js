const fs = require('fs');
const path = require('path');
// const products = [];
const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

const getProductsFromFile = cb => { // it has been done to make this functionality common on both funtions
    fs.readFile(p, (err, fileContent) => { 
        if (err) {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        // products.push(this); // this is the parameter of constructor
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
        /* 
        -   if you directly try to print products you will get an error
            if there are no contents in the file
        -   it is because whenever you fetch data from server it comes with a JSON
        -   so as to process you convert that data into javascript object
        -   it can be done with the help of 'JSON.parse()' inbuilt javascript function
        -   after that you will push that particular product into your 'products' array
        -   after pushing, you will need to put the product into your file
        -   but you can only put the json formatted file and then convert it back later
        -   so as to convert javascript object to again a JSON file, you will need to use a
            function 'JSON.stringify()' on line 24.
        -   and after processing it in function 'getProductsFromFile()' on line 6,
            you convert it back to normal javascript object with 'JSON.parse()' method
            on line 11.
        -   Important point to note: if you don't make an arrow function on line 22 then
            'this' keyword on line 23 wont get any class context and won't be able to add the 
            product into the file
        */
    }

    /*
    WRONG NORMAL WAY TO HANDLE ASYNCHRONOUS FUNCTION
    -   The below commented code is a normal(synchronous) way of adding stuffs into file.
    -   But in our case we want to run an asyncronous function i.e. 'fs.readFile()'
    -   So if we use this way then it will throw an error, because asynchronous function
        cannot return any value immediately, instead it promises to provide the result in future
    -   So the reason we cannot return any data with this way
    */
    /* static fetchAll() {
        const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return [];
            }
            return JSON.parse(fileContent);
        });
    } */

    /*
    RIGHT NORMAL WAY TO HANDLE ASYNCHRONOUS FUNCTION
    -   As it is an asynchronous function so it cannot return anything but will just give a
        promise to provide results lateron.
    -   to do so, you will use a callback function 'cb' which will just provide a data without
        any return statements which is shown on line 76.
    -   so as to fetch data from such function is to use an arrow function in controller
        and provide all the data when it is ready, which is done in 'products.js' in
        'controllers' folder on line number 29.  
    */
    /* static fetchAll(cb) {
        const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    } */

    /*
    We did this to minimize the complexity of code by putting the common thing out of both
    of the functions i.e. 'save()' and 'fetchAll()'
    */
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
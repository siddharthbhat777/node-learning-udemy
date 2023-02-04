const path = require('path');
const express = require('express');
const rootDir = require('../utils/path');
const router = express.Router();

router.get('/add-product',(req, res, next) => {
    console.log("In the add product middleware!");
    // normal way
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    // new way
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product',(req, res, next) => { // you can also restrict request to get, post, etc.
    console.log(req.body);
    res.redirect('/');
    console.log("In the product middleware!");
});

module.exports = router;
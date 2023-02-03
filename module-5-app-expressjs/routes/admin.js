const express = require('express');
const router = express.Router();

router.get('/add-product',(req, res, next) => {
    console.log("In the add product middleware!");
    res.send("<form action='/product' method='POST'><input type='text' name='title' /><button type='submit'>Add Product</button></form>");
});

router.post('/product',(req, res, next) => { // you can also restrict request to get, post, etc.
    console.log(req.body);
    res.redirect('/');
    console.log("In the product middleware!");
});

module.exports = router;
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{ // This is next middleware
    console.log("In another middleware!");
    // the Content-Type and all other stuffs are automatically set by express.js
    // You can also set it manually like 'res.setHeader()'
    // To go to root folder, use ".." and to go to one folder back, use "../"
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;
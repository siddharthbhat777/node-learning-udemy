const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{ // This is next middleware
    console.log("In another middleware!");
    // the Content-Type and all other stuffs are automatically set by express.js
    // You can also set it manually like 'res.setHeader()'
    res.send("<h1>Hello from Express Js</h1>");
});

module.exports = router;
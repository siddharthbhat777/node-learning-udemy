/* Watch Section 5 if you have any doubts */
// const http = require('http');

const express = require('express');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express(); // express package returns a method called "express()"

app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shopRoutes);

/*
app.use((req, res, next)=>{ // 'app.use()' helps you to set up middlewares
    console.log("In the middleware!");
    next(); // Allow request to continue to next middleware
});
*/

/* app.use('/add-product',(req, res, next) => {
    console.log("In the add product middleware!");
    res.send("<form action='/product' method='POST'><input type='text' name='title' /><button type='submit'>Add Product</button></form>");
});

app.post('/product',(req, res, next) => { // you can also restrict request to get, post, etc.
    console.log(req.body);
    res.redirect('/');
    console.log("In the product middleware!");
}); */

/* app.use('/',(req, res, next)=>{ // This is next middleware
    console.log("In another middleware!");
    // the Content-Type and all other stuffs are automatically set by express.js
    // You can also set it manually like 'res.setHeader()'
    res.send("<h1>Hello from Express Js</h1>");
}); */

// Traditional
/* 
const server = http.createServer(app);
server.listen(3000); 
*/

// With express.js
app.listen(3000);
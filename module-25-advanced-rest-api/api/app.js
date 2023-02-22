const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // default data - x-www-form-urlencoded
app.use(bodyParser.json()); // this is good for applicaytion/json (api)

// setting headers to avoid CORS error
app.use((req, res, next) => {
    // let who access our data.
    res.setHeader('Access-Control-Allow-Origin', '*'); // * means any source
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.listen(8080);
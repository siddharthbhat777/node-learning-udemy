const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database'); // creating constant
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // one user can have many products

/*
sequelize.sync()
- create tables for our application
- also defines relationships between models
*/
sequelize.sync({ force: true }).then((result) => { // 'force:true' means overriding table with new changes
    // console.log(result);
    app.listen(3000);
}).catch((err) => {
    console.log(err);
});


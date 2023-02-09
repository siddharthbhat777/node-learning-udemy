const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database'); // creating constant
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user;
        next();
    }).catch((err) => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // one user can have many products
User.hasOne(Cart); // one user can only have one cart
Cart.belongsTo(User); // Just vice versa not necessary to do this
Cart.belongsToMany(Product, { through: CartItem }); // multiple products in one cart
Product.belongsToMany(Cart, { through: CartItem }); // different carts of different users

/*
sequelize.sync()
- create tables for our application
- also defines relationships between models
*/
// sequelize.sync({ force: true }).then((result) => { // 'force:true' means overriding table with new changes
sequelize.sync({force: true}).then((result) => { // 'force:true' means overriding table with new changes
    return User.findByPk(1);
    // console.log(result);
}).then(user => {
    if (!user) {
        return User.create({ name: 'Siddharth', email: 'sid123@gmail.com' });
    }
    return user;
}).then(user => {
    // console.log(user);
    app.listen(3000);
}).catch((err) => {
    console.log(err);
});


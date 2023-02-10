const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch((err) => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Alternative way
  // Product.findAll({where: {id: prodId}}).then(-//- product: products[0], pageTitle: products[0].title).catch();
  Product.findByPk(prodId).then(product => { // 'findByPK' is same as 'findById'
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  }).catch((err) => {
    console.log(err);
  });;
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch((err) => {
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then((cart) => {
    return cart.getProducts().then((products) => { // getProducts() is a magic method by sequelize
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart().then((cart) => {
    fetchedCart = cart;
    return cart.getProducts({ where: { id: prodId } });
  }).then(products => {
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    if (product) { // if the product is already in cart then increase its quantity
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
    }
    return Product.findByPk(prodId); // adding new product
  }).then(product => {
    return fetchedCart.addProduct(product, { through: { quantity: newQuantity } }); // addProduct() is magic method by sequelize for many to many relationships
  }).then(() => {
    res.redirect('/cart');
  }).catch((err) => {
    console.log(err);
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

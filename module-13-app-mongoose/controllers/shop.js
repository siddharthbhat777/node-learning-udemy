const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  // find() is mmongoose method same as fetchAll()
  // If data is large then use find().cursor(), which is called pagination
  Product.find().then((products) => {
    console.log(products);
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
  Product.findById(prodId).then(product => { // mongoose also has a 'findById()' method
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
  Product.find().then((products) => {
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
  req.user.populate('cart.items.productId').then((user) => {
    const products = user.cart.items;
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  }).catch((err) => {
    console.log(err);
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then((product) => {
    return req.user.addToCart(product);
  }).then(result => {
    console.log(result);
    res.redirect('/cart');
  }).catch((err) => {
    console.log(err);
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId).then(result => {
    res.redirect('/cart');
  }).catch((err) => {
    console.log(err);
  });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.addOrder().then(result => {
    res.redirect('/orders');
  }).catch((err) => {
    console.log(err);
  });
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then((orders) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  }).catch((err) => {
    console.log(err);
  });
};

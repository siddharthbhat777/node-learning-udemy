const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',
    [
        body('title', 'Invalid title value.')
            .isLength({ max: 20 }).withMessage('Cannot exceed above 20 characters.')
            .isString()
            .trim(),
        body('price', 'Please enter valid price.')
            .isFloat()
            .trim(),
        body('description', 'Please enter valid description.')
            .isString()
    ], isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',
    [
        body('title', 'Invalid title value.')
            .isLength({ min: 3, max: 20 })
            .isString()
            .trim(),
        body('price', 'Please enter valid price.')
            .isFloat()
            .trim(),
        body('description', 'Please enter valid description.')
            .isLength({ min: 5, max: 500 })
            .isString()
    ], isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
const express = require('express');
const { check, body } = require('express-validator/check'); // performing destructuring

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter valid email address.')
            .normalizeEmail(), // it will store email in database in lowercase also will remove whitespaces
        body('password', 'Password has to be valid.') // default message
            .isLength({ min: 5 })
            .trim()
    ], authController.postLogin);

router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                /* if (value === 'test@test.com') {
                    throw new Error('This email address is forbidden.');
                }
                return true; */
                return User.findOne({ email: value }).then((userDoc) => {
                    // checking if user already exist
                    if (userDoc) {
                        return Promise.reject('E-Mail exists already, please pick a different one.');
                    }
                })
            })
            .normalizeEmail(),
        body('password', 'Please enter a password with only numbers and text and atleast 5 characters.')
            .isLength({ min: 5 })
            // .isAlphanumeric() // only allow to enter password with alphabets and numbers
            .trim(),
        body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match!');
            }
            return true;
        })
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword); // has to be named as 'token' here

router.post('/new-password', authController.postNewPassword);

module.exports = router;
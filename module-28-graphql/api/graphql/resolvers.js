const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
    createUser: async function ({ userInput }, req) {
        // const email = args.userInput.email;
        const errors = [];
        if (!validator.isEmail(userInput.email)) { // checking if user entered valid email format
            errors.push({ message: 'E-mail is invalid.' });
        }
        if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5 })) { // checking if user entered valid password format
            errors.push({ message: 'Password too short!' })
        }
        if (errors.length > 0) { // checking if any other error exist
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUser = await User.findOne({ email: userInput.email }); // checing if user already exist in database
        if (existingUser) { // if user already exist
            const error = new Error('User exists already!');
            throw error;
        }
        // if user not exist in database and is a new user
        const hashedPw = await bcrypt.hash(userInput.password, 12); // encrypting password
        const user = new User({ // setting user data
            email: userInput.email,
            name: userInput.name,
            password: hashedPw
        });
        const createdUser = await user.save(); // added user to database
        return { ...createdUser._doc, _id: createdUser._id.toString() }; // appeneded user with other existing users
    },
    login: async function ({ email, password }) {
        const user = await User.findOne({ email: email }); // check user
        if (!user) { // if user with certain email does not exist in database
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        // if email exists
        const isEqual = await bcrypt.compare(password, user.password); // checking password matching
        if (!isEqual) { // if password dosen't match
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        // if passsword is correct
        const token = jwt.sign({ // checking if valid token
            userId: user._id.toString(),
            email: user.email
        }, 'somesupersecretsecret', // adding secret key in parameter
            { expiresIn: '1h' } // added expiration time
        );
        return { token: token, userId: user._id.toString() }; // passing token and user id to frontend
    }
};
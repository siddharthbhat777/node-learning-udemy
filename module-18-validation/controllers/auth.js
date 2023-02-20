const crypto = require('crypto'); // in-built library of node js helps in creating unique random values
const bcrypt = require('bcryptjs'); // package which encrypts password
const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');

const User = require('../models/user');

// const transporter = nodemailer.createTransport(sendgridTransport({
//   auth: {
//     api_key: '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'
//   }
// }));

// using normal default way instead of send-grid because it was not working
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'siddharthbhat777@gmail.com',
    pass: 'njcqlksvxtuhzbad'
  }
});

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    oldInput: {
      email: "",
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      },
      validationErrors: errors.array()
    });
  }
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
      }
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            return res.redirect('/');
          });
        }
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
      }).catch((err) => {
        console.log(err);
        res.redirect('/login');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }
  return bcrypt.hash(password, 12).then(hashedPassword => {
    const user = new User({
      email: email,
      password: hashedPassword,
      cart: { items: [] }
    });
    return user.save();
  }).then(result => {
    res.redirect('/login');
    return transporter.sendMail({
      to: email,
      from: 'siddharthbhat777@gmail.com',
      subject: 'Signup Succeeded!',
      html: '<h1>You successfully signed up!</h1>'
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => { // normally crypto returns a buffer of random values
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex'); // to generate random value from this buffer we will do this
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        req.flash('error', 'No account with that email found.');
        return res.redirect('/reset');
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000; // current time + 1 , as we are setting expiration time here
      return user.save();
    }).then(result => {
      res.redirect('/');
      transporter.sendMail({
        to: req.body.email,
        from: 'siddharthbhat777@gmail.com',
        subject: 'Password reset',
        html: `
        <p>You requested a password reset</p>
        <p>Click <a href="http://localhost:3000/reset/${token}">here</a> link to set a new password.</p>
        `
      });
    }).catch((err) => {
      console.log(err);
    });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  // '$gt: Date.now()' means greater than current time i.e. user should reset password before expiration time i.e. 1 hour
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } }).then((user) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/new-password', {
      path: '/new-password',
      pageTitle: 'New Password',
      errorMessage: message,
      userId: user._id.toString(),
      passwordToken: token,
      email: user.email
    });
  }).catch((err) => {
    console.log(err);
  });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  const email = req.body.email;
  let resetUser;

  User.findOne({ resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() }, _id: userId }).then((user) => {
    resetUser = user;
    return bcrypt.hash(newPassword, 12);
  }).then(hashedPassword => {
    resetUser.password = hashedPassword;
    resetUser.resetToken = undefined; // to re-initialize
    resetUser.resetTokenExpiration = undefined; // to re-initialize
    return resetUser.save();
  }).then(result => {
    res.redirect('/login');
    transporter.sendMail({
      to: email,
      from: 'siddharthbhat777@gmail.com',
      subject: 'Password Update Succeeded!',
      html: '<h1>Your new password has been updated successfully!</h1>'
    });
  }).catch((err) => {
    console.log(err);
  });
};
exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').trim().split('=')[1];
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false // isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10'); // cookie will expire in 10 secs
    /*
    cookie value in browser: true
    session value in browser: s%3A7s5HONae9ybO_majlB411qjjjuZSBL77.7IJOrJ9dW3mguQp2ngjSYoY%2BejPqNXijcGsSS5HbdCI
    */
    req.session.isLoggedIn = true;
    res.redirect('/');
};
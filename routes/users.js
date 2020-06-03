var router = require('express').Router();
var usersCtrl = require('../controllers/users');

// GET /users
router.get('/', usersCtrl.index);

// // POST /posts
// router.post('/posts', isLoggedIn, usersCtrl.addBlog);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) {
      return next();
    } else {
    res.redirect('/auth/google');
  }
}

module.exports = router;
var router = require('express').Router();
const passport = require('passport');
const commentsCtrl = require('../controllers/comments');

router.get('/comments/:id/edit',isLoggedIn, commentsCtrl.edit);
router.post('/posts/:id/comments',isLoggedIn, commentsCtrl.create);
router.put('/comments/:id',isLoggedIn, commentsCtrl.update);
router.delete('/comments/:id',isLoggedIn, commentsCtrl.delete);


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) {
      return next();
    } else {
    res.redirect('/auth/google');
  }
}

module.exports = router;
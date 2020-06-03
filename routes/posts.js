var router = require('express').Router();
const passport = require('passport');
const postsCtrl = require('../controllers/posts');

router.get('/', postsCtrl.index);
router.get('/new', postsCtrl.new);
router.get('/:id', postsCtrl.show);
router.get('/:id/edit', postsCtrl.edit)
router.post('/', postsCtrl.create);
router.put('/:id', postsCtrl.update)
router.delete('/:id', postsCtrl.delete);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) {
      return next();
    } else {
    res.redirect('/auth/google');
  }
}

module.exports = router;
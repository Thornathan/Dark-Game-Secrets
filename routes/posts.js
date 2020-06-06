var router = require('express').Router();
const passport = require('passport');
const postsCtrl = require('../controllers/posts');

router.get('/', postsCtrl.index);
router.get('/all', postsCtrl.allPosts);
router.get('/new',isLoggedIn, postsCtrl.new);
router.get('/:id', postsCtrl.show);
router.get('/:id/edit',isLoggedIn, postsCtrl.edit)
router.post('/',isLoggedIn, postsCtrl.create);
router.put('/:id',isLoggedIn, postsCtrl.update)
router.delete('/:id',isLoggedIn, postsCtrl.delete);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;
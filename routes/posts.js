var router = require('express').Router();
const passport = require('passport');
const postsCtrl = require('../controllers/posts');

router.get('/', postsCtrl.index);
router.get('/new', postsCtrl.new);
router.get('/:id', postsCtrl.show);
router.post('/', postsCtrl.create);
router.delete('/:id', postsCtrl.delete);

module.exports = router;
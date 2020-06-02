var router = require('express').Router();
const passport = require('passport');
const commentsCtrl = require('../controllers/comments');

router.get('/', commentsCtrl.index);
router.get('/new', commentsCtrl.new);
router.get('/:id', commentsCtrl.show);
router.post('/', commentsCtrl.create);
router.delete('/:id', commentsCtrl.delete);

module.exports = router;
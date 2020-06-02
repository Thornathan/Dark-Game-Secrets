const Post = require('../models/post');

module.exports = {
  index,
  create,
  new: newPost,
  show,
  delete: deletePost
};

function show(req, res) {
    Post.findById(req.params.id, function(err, posts) {
        res.render('users/show', {posts});
    });
};

function newPost(req, res) {
    res.render('users/new');
}

function index(req, res) {
    Post.find({}, function(err, posts) {
        res.render('users/index', {posts});
    });
};

function create(req, res) {
    req.body.user =req.user;
    const post = new Post(req.body);
    post.save(function (err) {
        if(err) return res.redirect('/users');
        res.redirect('/users');
    })
}

function deletePost(req, res) {
    
}
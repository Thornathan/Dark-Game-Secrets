const Post = require('../models/post');

module.exports = {
  index,
  create,
  new: newPost,
  show,
  edit,
  update,
  delete: deletePost
};

function show(req, res) {
    let user = null;
    if(req.user) {
        user = req.user;
    }
    Post.findById(req.params.id, function(err, post) {
        res.render('posts/show', {post, user});
    });
};

function newPost(req, res) {
    let user = null;
    if(req.user) {
        user = req.user;
    }
    res.render('posts/new.ejs', {user});
}

function index(req, res) {
    let user = null;
    if(req.user) {
        user = req.user;
    }
    Post.find({}, function(err, posts) {
        console.log(posts);
        res.render('posts/index', {posts, user});
    });
};

function create(req, res) {
    req.body.user = req.user
    Post.create(req.body);
        res.redirect('/posts');
}

function edit(req, res) {
    Post.findById(req.params.id, function(err, posts) {
        res.render('posts/edit', {posts});
    })
}

function update(req, res) {
    Post.findByIdAndUpdate(req.params.id, function(err) {
        res.redirect(`/posts/${req.params.id}`)
    })
}

function deletePost(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/posts');
    }
  });
}
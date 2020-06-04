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
        console.log(post);
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
  Post.find({}, function (err, posts) {
      console.log(req.user)
      res.render('posts/index', { posts, user: req.user });
  });
}

function create(req, res) {
    req.body.user = req.user;
    const post = new Post(req.body);
    console.log(req.body);
    post.save(function (err) {
        if (err) return res.redirect('/posts');
        console.log(post);
        res.redirect(`/posts`);
    });
}

function edit(req, res) {
    let user = null;
    if(req.user) {
        user = req.user;
    }
    Post.findById(req.params.id, function(err, posts) {
        res.render('posts/edit', {posts, user});
    })
}

function update(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, function(err) {
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
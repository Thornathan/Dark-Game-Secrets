const Post = require('../models/post');
const User = require('../models/user')

module.exports = {
  index,
  allPosts,
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
        User.findById(post.user, function(err, postUser) {
            res.render('posts/show', {post, user, postUser});
        })
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
    Post.find({})
    .populate('user')
    .exec(function(err, posts) {
        res.render('posts/index', { posts, user: req.user });
    })
}

function allPosts(req, res) {
  let postQuerry = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  Post.find(postQuerry, function(err, posts) {
	res.render('/posts/index', {
	  posts,
	  user: req.user,
	  nameSearch: req.query.name 
	});
  });
}

function create(req, res) {
    const post = new Post(req.body);
    post.user = req.user._id;
    post.save(function (err) {
        if (err) return res.redirect('/posts');
        res.redirect(`/posts/${post._id}`);
    });
}

function edit(req, res) {
    let user = null;
    if(req.user) {
        user = req.user;
    }
    Post.findById(req.params.id, function(err, posts) {
        if (!posts.user.equals(req.user._id)) return res.redirect('/posts');
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
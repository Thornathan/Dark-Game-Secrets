const Post = require('../models/post');

module.exports = {
  create,
  edit,
  update,
  delete: deleteComment
};

function create(req, res) {
    Post.findById(req.params.id, function(err, post) {
        req.body.user = req.user._id;
        post.comments.push(req.body);
        console.log(req.body);
        post.save(function(err) {
            res.redirect(`/posts/${post._id}`);
        })
    })
}

function edit(req, res) {
    let user = null;
    if(req.user) {
        user = req.user;
    }
    Post.findById(req.params.id, function(err, post) {
        if (!post.user.equals(req.user._id)) return res.redirect('/posts');
        res.render('posts/edit', {post, user});
    })
}

function update(req, res) {
  Post.findOne({'comments._id': req.params.id}, function(err, post) {
    const commentSubdoc = post.comments.id(req.params.id);
    if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
    commentSubdoc.content = req.body.content;
    post.save(function(err) {
      res.redirect(`/posts/${post._id}`);
    });
  });
}

function deleteComment(req, res) {
  Post.findOne({'comments._id': req.params.id}, function(err, post) {
    const commentSubdoc = post.comments.id(req.params.id);
    if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
    commentSubdoc.remove();
    post.save(function(err) {
      res.redirect(`/posts/${post._id}`);
    });
  });
}
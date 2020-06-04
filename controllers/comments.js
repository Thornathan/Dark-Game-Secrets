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
        res.render('posts/edit', {post, user});
    })
}

function update(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Post.findOne({'comments._id': req.params.id}, function(err, post) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const commentSubdoc = post.comments.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
    // Update the text of the comment
    commentSubdoc.content = req.body.content;

    // Save the updated post
    post.save(function(err) {
      // Redirect back to the post's show view
      res.redirect(`/posts/${post._id}`);
    });
  });
}

function deleteComment(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Post.findOne({'comments._id': req.params.id}, function(err, post) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const commentSubdoc = post.comments.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
    // Remove the comment using the remove method of the subdoc
    commentSubdoc.remove();
    // Save the updated book
    post.save(function(err) {
      // Redirect back to the book's show view
      res.redirect(`/posts/${post._id}`);
    });
  });
}
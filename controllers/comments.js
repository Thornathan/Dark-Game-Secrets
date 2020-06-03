const Post = require('../models/post');

module.exports = {
  create
};

function create(req, res) {
    Post.findById(req.params.id, function(err, post) {
        post.comments.push(req.body);
        console.log(req.body);
        post.save(function(err) {
            res.redirect(`/posts/${post._id}`);
        })
    })
}
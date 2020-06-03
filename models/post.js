var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
  timestamps: true
});

var postsSchema = new mongoose.Schema({
    title: String,
    post: String,
    comments: [commentsSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postsSchema);
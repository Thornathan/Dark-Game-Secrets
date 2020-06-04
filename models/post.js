var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
    },
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
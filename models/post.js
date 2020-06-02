var mongoose = require('mongoose');

var postsSchema = new mongoose.Schema({
    title: String,
    post: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postsSchema);
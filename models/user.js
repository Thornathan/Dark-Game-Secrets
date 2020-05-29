var mongoose = require('mongoose');

// The factSchema is used to embedded docs in as student doc.
// There is no model and no 'facts' collection
var postsSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
});

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  posts: [postsSchema],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
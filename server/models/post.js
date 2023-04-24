const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  hashtags: {
    type: Array,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    required: false,
  },
  likedBy: {
    type: Array,
    required: false,
  },
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    }
});

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
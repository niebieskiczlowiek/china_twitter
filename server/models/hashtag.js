const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
    hashtag: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});

const Hashtag = mongoose.model('hashtags', hashtagSchema);

module.exports = Hashtag;
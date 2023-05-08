const Comment = require("../../models/comment")
const Post = require("../../models/post")
const jwt = require("jsonwebtoken")

const add_comment = async (req, res) => {
    const data = req.body;

    const comment = {
        email: data.currentEmail,
        comment: data.comment,
        postId: data.postId,
    }

    try {
        await Comment.create(comment);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false });
    }
}

module.exports = {
    add_comment,
};
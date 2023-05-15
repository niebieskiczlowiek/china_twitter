const Comment = require("../../models/comment")
const Post = require("../../models/post")
const jwt = require("jsonwebtoken")

const add_comment = async (req, res) => {
    const data = req.body;

    const comment = {
        email: data.currentEmail,
        author: data.author,
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

const get_comments = async (req, res) => {
    const data = req.body;
    let postId = data.postId;

    console.log(postId)

    try {
        // const comments = await Comment.find({ postId: postId });
        const comments = await Comment.find({
            postId: postId
        });

        console.log(comments)

        return res.status(200).json({ success: true, comments: comments });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false });

    }
}

module.exports = {
    add_comment,
    get_comments,
};
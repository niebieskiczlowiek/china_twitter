const Post = require("../../models/post");
const jwt = require("jsonwebtoken")

const add_post = async (req, res) => {
    const data = req.body;

    const post = {
        title : data.title,
        hashtags: data.hashtags,
        content : data.content,
        date : Date.now(),

    }
    
     try {
        await Post.create(post);

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false });
    }

};

const get_posts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json({ success: true, posts})
    } catch (error) {
        return res.status(500).json({ success: false });
    }
};

module.exports = {
    add_post,
    get_posts,
};
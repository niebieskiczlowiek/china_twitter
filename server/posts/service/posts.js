const Post = require("../../models/post");
const jwt = require("jsonwebtoken")

const add_post = async (req, res) => {
    const data = req.body;

    const post = {
        fullName : data.currentFullName,
        username : data.currentUsername,
        hashtags: data.hashtags,
        content : data.content,
        date : Date.now(),
        likes : 0,
        likedBy : [],
        comments : {},

    }
    
     try {
        await Post.create(post);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error)
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

const update_like_count = async (req, res) => {
    const data = req.body;
    const email = data.currentEmail;
    const postId = data.postId;
    
    try{
        const post = await Post.findOne({ '_id': postId });
        const likeCount = post.likes
        const likedBy = [...post.likedBy];

        if (likedBy.includes(email)) {
            const newLikedBy = likedBy.filter((item) => item !== email)
            const newPost = await Post.updateOne({ '_id': postId }, { $set: { likes: likeCount - 1, likedBy: newLikedBy } })
            const likeStatus = false;
            return res.status(200).json({ success: true, likeStatus });
        } else {
            const newLikedBy = likedBy.concat(email)
            const newPost = await Post.updateOne({ '_id': postId }, { $set: { likes: likeCount + 1, likedBy: newLikedBy } })
            const likeStatus = true;
            return res.status(200).json({ success: true, likeStatus });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false });
    }
};

const get_single_post = async (req, res) => {
    const data = req.body;
    const postId = data.postId;

    try {
        const post = await Post.findOne({ '_id': postId })

        return res.status(200).json({success: true, post: post})

    } catch (error) {
        return res.status(500).json({ success: false });
    }
}

const check_if_liked = async (req, res) => {
    const data = req.body;

    const payload = {
        postId: data.postId,
        email: data.email
    };

    console.log(payload, "payload")

    try {
        const post = await Post.findOne({ '_id': payload.postId })

        if (post.likedBy.includes(payload.email)) {
            console.log("true")
            return res.status(200).json({ success: true, likeStatus: true })
        }
        else {
            console.log("false")
            return res.status(200).json({ success: true, likeStatus: false })
        }
    } catch (error) {
        return res.status(500).json({ success: false });
    }
}

module.exports = {
    add_post,
    get_posts,
    update_like_count,
    get_single_post,
    check_if_liked
};
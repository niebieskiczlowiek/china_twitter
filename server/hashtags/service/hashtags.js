const Hashtag = require("../../models/hashtag")
const Post = require("../../models/post")
const jwt = require("jsonwebtoken")

const get_all_hashtags = async (req, res) => {
    const data = req.body;
    try {
        const deleteAll = await Hashtag.deleteMany({});

        const posts = await Post.find({});

        let newHashtags = [];

        console.log("STARTING")
        posts.forEach(
            async (post) => {
                post.hashtags.forEach(
                    async (tag) => {
                        if (post.hashtags.length === 0) {
                            // pass
                        } else {

                            const exists = newHashtags.some((item) => item.hashtag === tag);
                            if (exists === false) {
                                const newHashtag = {
                                    hashtag: tag,
                                    count: 1,
                                }

                                newHashtags.push(newHashtag);

                            } else {
                                const existingHashtag = newHashtags.find((item) => item.hashtag === tag);
                                const index = newHashtags.indexOf(existingHashtag);
                                newHashtags[index].count = newHashtags[index].count + 1;                       
                            }
                        }
                    }
                )
            }
        )

        console.log(newHashtags, "newHashtags")

        const createHashtags = Hashtag.insertMany(newHashtags);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false });
    }


    return res.status(200).json({ success: true });
};

const get_popular_tags = async (req, res) => {
    try {
        const hashtags = await Hashtag.find({}).sort({ count: -1 }).limit(10);
        return res.status(200).json({ success: true, hashtags })
    } catch (error) {
        return res.status(500).json({ success: false });
    }
};

module.exports = {
    get_all_hashtags,
    get_popular_tags,
};
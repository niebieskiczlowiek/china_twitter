const Hashtag = require("../../models/hashtag")
const jwt = require("jsonwebtoken")

const save_hashtags = async (req, res) => {
    const data = req.body;
    try {

        data.forEach(
            async (tag) => {
                const exists = await Hashtag.findOne(
                    { hashtag: tag },
                )
                if (exists === null) {
                    await Hashtag.create({ hashtag: tag, count: 1 })
                } else {
                    await Hashtag.updateOne(
                        { hashtag: tag },
                        { $inc: { count: 1 } }
                    )
                }

            }
        )

    } catch (error) {
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
    save_hashtags,
    get_popular_tags,
};
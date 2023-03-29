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

const get_popular_tags = async (req, res) => {
    try {
        const hashtags = await Post.find({}).select("hashtags");    
        const allTags = [];
        const countedTags = []

        hashtags.forEach(
            tag => tag.hashtags.forEach(
                inner_tag => allTags.push(inner_tag)
            )
        );

        const uniqTags = [...new Set(allTags)]
        
        const count_tags = (tag) => {
            let count = 0;
            
            allTags.forEach(
                inner_tag => {
                    if (inner_tag === tag) {
                        count++;
                    }
                }
            )
            return {tag, count}
          }

          uniqTags.forEach( 
            tag => countedTags.push(count_tags(tag))
          )

          console.log(countedTags)
        
        return res.status(200).json({ success: true, countedTags })
    } catch (error) {
        return res.status(500).json({ success: false});
    }
};

module.exports = {
    add_post,
    get_posts,
    get_popular_tags,
};
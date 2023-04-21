const express = require('express');
const router = express.Router();
const postsService = require('./service/posts');

router.post('/api/posts/add', postsService.add_post);
router.get('/api/posts/get', postsService.get_posts);
router.post('/api/posts/update_likes', postsService.update_like_count);

module.exports = router;
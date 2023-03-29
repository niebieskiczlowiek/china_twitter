const express = require('express');
const router = express.Router();
const postsService = require('./service/posts');

router.post('/api/posts/add', postsService.add_post);
router.get('/api/posts/get', postsService.get_posts);
router.get('/api/posts/get_tags', postsService.get_popular_tags);

module.exports = router;
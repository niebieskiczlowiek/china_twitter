const express = require('express');
const router = express.Router();
const postsService = require('./service/posts');

router.post('/api/posts/add', postsService.add_post);
router.get('/api/posts/get', postsService.get_posts);
router.post('/api/posts/update_likes', postsService.update_like_count);
router.post('/api/posts/get_single', postsService.get_single_post)
router.post('/api/posts/check_if_liked', postsService.check_if_liked)
router.post('/api/posts/get/hashtag', postsService.get_posts_by_hashtag)

module.exports = router;
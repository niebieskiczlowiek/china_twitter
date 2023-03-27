const express = require('express');
const router = express.Router();
const postsService = require('./service/posts');

router.post('/api/posts/add', postsService.add_post);

module.exports = router;
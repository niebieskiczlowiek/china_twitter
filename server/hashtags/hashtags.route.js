const express = require('express');
const router = express.Router();
const hashtagService = require('./service/hashtags');

router.post('/api/hashtags/post', hashtagService.save_hashtags)
router.get('/api/hashtags/get_popular', hashtagService.get_popular_tags)

module.exports = router;

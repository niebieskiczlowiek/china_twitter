const express = require('express');
const router = express.Router();
const hashtagService = require('./service/hashtags');

router.get('/api/hashtags/update_hashtags', hashtagService.get_all_hashtags);
router.get('/api/hashtags/get_popular', hashtagService.get_popular_tags);

module.exports = router;

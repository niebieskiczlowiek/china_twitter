const express = require('express');
const router = express.Router();
const commentService = require('./service/comments');

router.post('/api/comments/add', commentService.add_comment);
router.post('/api/comments/get', commentService.get_comments)

module.exports = router;

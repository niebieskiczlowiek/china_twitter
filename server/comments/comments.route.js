const express = require('express');
const router = express.Router();
const commentService = require('./service/comments');

router.post('/api/comments/add', commentService.add_comment);

module.exports = router;

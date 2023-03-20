const express = require('express');
const router = express.Router();
const checkService = require('./service/check');

router.post('/api/check', checkService.check);

module.exports = router;

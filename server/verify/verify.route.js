const express = require('express')
const router = express.Router();
const VerifyService = require('./service/verify');

router.post('/api/verify/', VerifyService.VerifyUser);

module.exports = router;
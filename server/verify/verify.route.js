const express = require('express')
const router = express.Router();
const VerifyService = require('./service/verify');

router.get('/api/verify/sssss', VerifyService);


module.exports = router;
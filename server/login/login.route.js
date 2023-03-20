const express = require('express');
const router = express.Router();
const loginService = require('./service');

router.post('/api/login', loginService.login);

module.exports = router;

const express = require('express')
const router = express.Router();
const registerService = require('./service/register');

router.post('/api/register', registerService.Adduser)


module.exports = router;
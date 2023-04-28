const express = require('express')
const router = express.Router();
const registerService = require('./service/register');

router.post('/api/register', registerService.Adduser)
router.get('/api/confirm/:token/:verified', registerService.ConfirmUser)


module.exports = router;
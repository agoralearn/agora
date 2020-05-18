const express = require('express');
const chatController = require('../controllers/chat');

// const isAuthenticated = require('../config/isAuthenticated');
// const userController = require('../controllers/user');

const router = express.Router();

router.post('/', chatController.startChat);

module.exports = router;

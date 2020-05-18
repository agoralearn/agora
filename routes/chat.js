const express = require('express');
const chatController = require('../controllers/chat');

// const isAuthenticated = require('../config/isAuthenticated');
// const userController = require('../controllers/user');

const router = express.Router();

// We will have to look at the JWT token to make sure they are who they say they are
// before doing anything with these routes. We can set it up as middleware

router.post('/', chatController.startChat);
router.post('/message', chatController.addMessageToChat);

module.exports = router;

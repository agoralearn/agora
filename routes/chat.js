const express = require('express');
const chatController = require('../controllers/chat');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.post('/', isAuthenticated, chatController.startChat);
router.post('/message', isAuthenticated, chatController.addMessageToChat);
router.get('/chats', isAuthenticated, chatController.getChatsByUserId);
router.get('/:chatId', isAuthenticated, chatController.getChat);

module.exports = router;

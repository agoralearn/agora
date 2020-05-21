const express = require('express');
const chatController = require('../controllers/chat');
const isAuthenticated = require('../middleware/isAuthenticated');

// const isAuthenticated = require('../config/isAuthenticated');
// const userController = require('../controllers/user');

const router = express.Router();

// We will have to look at the JWT token to make sure they are who they say they are
// before doing anything with these routes. We can set it up as middleware

router.post('/', isAuthenticated, chatController.startChat);
router.post(
  '/message',
  isAuthenticated,
  (req, res, next) => {
    // console.log(socketMapping);
    req.io.emit('news', { hello: 'Getting News' });

    next();
  },
  chatController.addMessageToChat
);
router.get('/chats', isAuthenticated, chatController.getChatsByUserId);
router.get('/:chatId', isAuthenticated, chatController.getChat);

module.exports = router;

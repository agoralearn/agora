const db = require('../models');
module.exports = {
  // Start a new chat
  // Pass two user ids in userIds in the body
  startChat: function (req, res) {
    const { message } = req.body;
    const userIds = [
      req.user.id,
      ...req.body.userIds.filter((id) => id !== req.user.id)
    ];

    if (userIds.length > 1) {
      db.Message.create({
        message: message,
        read: [req.user.id],
        sender: req.user.id
      }).then((message) => {
        db.Chat.create({
          users: userIds,
          messages: [message._id]
        }).then((chat) => {
          const chatsToUser = userIds.map((userId) => {
            return db.User.findByIdAndUpdate(
              userId,
              {
                $push: { chats: chat._id }
              },
              { returnOriginal: false }
            ).populate({
              path: 'chats',
              populate: {
                path: 'users messages',
                select: 'firstName lastName image message sender read'
              }
            });
          });
          Promise.all(chatsToUser).then((users) => {
            res.json(
              users[0].chats.filter((lastChat) => {
                return lastChat._id.toString() === chat._id.toString();
              })[0]
            );
          });
        });
      });
    }
  },
  addMessageToChat: function (req, res) {
    // Check if the user belongs to the chat first
    // First create the message
    // const senderId = req.user.id;
    let messageToReturn;
    db.Message.create({
      sender: req.user.id,
      read: [req.user.id],
      message: req.body.message
    })
      // Add the message the associated chat
      .then((message) => {
        messageToReturn = message;
        const messageId = message._id;
        return db.Chat.findByIdAndUpdate(
          req.body.chatId,
          {
            $push: { messages: messageId }
          },
          { returnOriginal: false }
        );
      })
      // Send the sent message back to the client so it can use
      // it for UI updates
      .then(() => {
        // Emit message with socket.io
        req.body.receivers.forEach((userId) => {
          if (req.socketMap[userId]) {
            req.io.to(req.socketMap[userId]).emit('message', {
              message: messageToReturn,
              chatId: req.body.chatId
            });
          }
        });

        res.json(messageToReturn);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json({ message: err.message });
      });
    // Add the message's ID to the associated chat
  },
  getChat: function (req, res) {
    db.Chat.findById(req.params.chatId)
      .populate({
        path: 'users',
        select: 'firstName lastName image '
      })
      .populate('messages')
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).send({ success: false, message: 'No chat found' });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },
  getChatsByUserId: function (req, res) {
    // all user's chats, users in the chats by name + image, last message in chat,
    const userId = req.user.id;
    db.Chat.find({
      users: userId
    })
      .sort({ updatedAt: 'desc' })
      .populate({
        path: 'users',
        select: 'firstName lastName image'
      })
      .populate({
        path: 'messages',
        options: {
          sort: {
            createdAt: 'desc'
          }
        },
        perDocumentLimit: 1
      })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).send({ success: false, message: 'No chat found' });
        }
      })
      .catch((err) => res.status(400).send(err));
  },

  startStopSession: function (req, res) {
    console.log('Patch route');
    res.sendStatus(200);
  }
};

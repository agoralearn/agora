const db = require('../models');

module.exports = {
  // Start a new chat
  // Pass two user ids in userIds in the body
  startChat: function (req, res) {
    const userIds = req.body.userIds;
    console.log(userIds);
    // A new chat needs to have two users to start it
    if (userIds.length < 2) {
      res.status(500).json({
        message: 'A chat requires a minimum of two user IDs.',
        userIds: req.body.userIds
      });
    } else {
      db.Chat.create({
        users: [...userIds],
        messages: []
      })
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.status(500).json({
            error: err.message
          });
        });
    }
  },

  addMessageToChat: function (req, res) {
    // Check if the user belongs to the chat first
    // First create the message
    db.Message.create({
      sender: req.body.userId,
      read: [req.body.userId],
      message: req.body.message
    })
      // Add the message the associated chat
      .then((message) => {
        const messageId = message._id;

        return db.Chat.findByIdAndUpdate(req.body.chatId, {
          $push: { messages: messageId }
        });
      })
      // Send the sent message back to the client so it can use
      // it for UI updates
      .then(() => {
        res.json({ message: req.body.message });
      })
      .catch((err) => {
        console.log(err);
        res.send(500).json({ message: err.message });
      });

    // Add the message's ID to the associated chat
  },
  getChat: function (req, res) {
    db.Chat.findById(req.params.chatId)
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).send({ success: false, message: 'No chat found' });
        }
      })
      .catch((err) => res.status(400).send(err));
  },
  getChatsByUserId: function (req, res) {
    db.User.findById(req.params.userId)
      .populate('chats')
      .exec((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).send({ success: false, message: 'No chat found' });
        }
      })
      .catch((err) => res.status(400).send(err));
  }
};

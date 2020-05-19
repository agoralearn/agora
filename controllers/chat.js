const db = require('../models');

module.exports = {
  // Start a new chat
  // Pass two user ids in userIds in the body
  startChat: function (req, res) {
    const { message } = req.body;
    const userIds = [req.user.id, ...req.body.userIds];

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
  },

  addMessageToChat: function (req, res) {
    // Check if the user belongs to the chat first
    // First create the message

    const senderId = req.user.id;

    db.Message.create({
      sender: senderId,
      read: [senderId],
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
        if (data && data.users.includes(req.user.id)) {
          res.json(data);
        } else {
          res.status(404).send({ success: false, message: 'No chat found' });
        }
      })
      .catch((err) => res.status(400).send(err));
  },
  getChatsByUserId: function (req, res) {
    // all user's chats, users in the chats by name + image, last message in chat,
    const userId = req.user.id;
    console.log(userId);
    db.Chat.find({
      users: userId
    })
      .populate({
        path: 'users',
        select: 'firstName lastName image'
      })
      .populate({
        path: 'messages',
        options: {
          sort: {
            createdAt: 'desc'
          },
          limit: 1
        }
      })
      // .populate('userIds')
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).send({ success: false, message: 'No chat found' });
        }
      })
      .catch((err) => res.status(400).send(err));
  }
};

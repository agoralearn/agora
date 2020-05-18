const db = require('../models');

module.exports = {
  // Start a new chat
  // Pass two user ids in userIds
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
  }
};

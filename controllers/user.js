const db = require('../models');

module.exports = {
  getUserById: function (req, res) {
    db.User.findById(req.params.id)
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).send({ success: false, message: 'No user found' });
        }
      })
      .catch((err) => res.status(400).send(err));
  },
  updateUser: function (req, res) {
    const filter = { _id: req.params.id };
    db.User.findOneAndUpdate(filter, req.body).then((data) => {
      res.json(data).catch((err) => res.status(400).send(err));
    });
  }
};

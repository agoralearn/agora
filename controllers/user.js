const db = require('../models');

module.exports = {
  getCurrentUser: function (req, res) {
    db.User.findById(req.user.id)
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
    console.log(req.body);
    db.User.findByIdAndUpdate(req.user.id, req.body, { returnOriginal: false })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(400).send(err));
  },

  signUpUser: function (req, res) {
    db.User.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => {
        if (err && err.code === 11000) {
          res
            .status(400)
            .json({ message: 'An account with that email already exists.' });
        } else {
          res.status(400).json({ message: 'Internal Server Error.' });
        }
      });
  },
  getUsersNameById: function (req, res) {
    db.User.findById(req.params.id)
      .select('firstName lastName')
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).send({ success: false, message: 'No user found' });
        }
      })
      .catch((err) => res.status(400).send(err));
  }
};

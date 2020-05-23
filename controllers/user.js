const db = require('../models');

module.exports = {
  getUserById: function (req, res) {
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
  getStudentByName: function (req, res) {
    if (req.query.name.length > 0) {
      const expression = new RegExp(req.query.name, 'i');
      db.User.aggregate([
        { $project: { name: { $concat: ['$firstName', ' ', '$lastName'] } } },
        { $match: { name: expression } }
      ])
        // .select('firstName lastName image')
        .exec((err, data) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.json(data);
          }
          // console.log(data);
        });
    } else {
      res.status(500).json('min 4 characters');
    }
    // .catch((err) => res.status(400).send(err));
  }
};

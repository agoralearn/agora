const db = require('../models');

module.exports = {
  getTutors: function (req, res) {
    db.User.find({ role: 'tutor' })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  getTutorById: function (req, res) {
    db.User.findOne({
      role: 'tutor',
      _id: req.params.id
    })
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

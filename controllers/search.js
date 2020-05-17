const db = require('../models');

function getTutors(req, res) {
  // const searchParameters = req.query;

  // need to destructure search parameters and pass them into find somehow
  db.User.find({ role: 'Tutor' })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function getTutorById(req, res) {
  db.User.findById(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
}

module.exports = {
  getTutors,
  getTutorById
};

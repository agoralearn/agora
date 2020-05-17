const db = require('../models');

function getTutors(req, res) {
  // const searchParameters = req.query;

  // need to destructure search parameters and pass them into find somehow
  db.Tutor.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

module.exports = {
  getTutors
};

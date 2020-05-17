const db = require('../models');

function signUpUser(req, res) {
  db.User.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).send(err));
}

module.exports = {
  signUpUser
};

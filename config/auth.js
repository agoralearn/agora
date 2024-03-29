const db = require('../models');
const jwt = require('jsonwebtoken');

const LOGIN_ERROR_MSG = 'Incorrect email or password.';

module.exports = {
  logUserIn: function (email, password) {
    return new Promise((resolve, reject) => {
      db.User.findOne({
        email: email
      })
        .select('+password')
        .then((user) => {
          user.verifyPassword(password, (err, isMatch) => {
            if (isMatch && !err) {
              // remove password from user object
              user.password = null;
              const token = jwt.sign(
                {
                  id: user._id,
                  email: user.email,
                  role: user.role,
                  image: user.image
                },
                process.env.SERVER_SECRET,
                { expiresIn: 129600 }
              ); // Sigining the token
              resolve({
                success: true,
                message: 'Token Issued!',
                token: token,
                user: user
              });
            } else {
              reject({
                success: false,
                message: LOGIN_ERROR_MSG
              });
            }
          });
        })
        .catch((err) =>
          reject({ success: false, message: LOGIN_ERROR_MSG, error: err })
        );
    });
  }
};

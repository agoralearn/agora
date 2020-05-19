const express = require('express');

const isAuthenticated = require('../middleware/isAuthenticated');
const userController = require('../controllers/user');

const router = express.Router();

// use isAuthenticated middleware to protect this route

// Get logged in users info
router.get('/', isAuthenticated, userController.getUserById);

// Editing users profile
router.patch('/', isAuthenticated, userController.updateUser);

// Signing up a user
router.post('/', userController.signUpUser);
module.exports = router;

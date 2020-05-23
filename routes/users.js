const express = require('express');

const isAuthenticated = require('../middleware/isAuthenticated');
const userController = require('../controllers/user');

const router = express.Router();

// use isAuthenticated middleware to protect this route

// Get logged in users info
router.get('/', isAuthenticated, userController.getCurrentUser);

// Editing users profile
router.patch('/', isAuthenticated, userController.updateUser);

// Signing up a user
router.post('/', userController.signUpUser);

// Get user's info by ID
router.get('/:id', isAuthenticated, userController.getUsersNameById);

module.exports = router;

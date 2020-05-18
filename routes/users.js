const express = require('express');

const isAuthenticated = require('../config/isAuthenticated');
const userController = require('../controllers/user');

const router = express.Router();

// use isAuthenticated middleware to protect this route
router.get('/api/user/:id', isAuthenticated, userController.getUserById);
router.patch('/api/user/:id', isAuthenticated, userController.updateUser);
router.post('/api/user', userController.signUpUser);
module.exports = router;

const express = require('express');

const isAuthenticated = require('../config/isAuthenticated');
const userController = require('../controllers/user');

const router = express.Router();

// use isAuthenticated middleware to protect this route
router.get('/api/user/:id', isAuthenticated, userController.getUserById);

module.exports = router;

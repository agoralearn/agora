const express = require('express');
const searchController = require('../controllers/search');

const router = express.Router();

router.get('/api/tutors', searchController.getTutors);

router.get('/api/tutors/:id', searchController.getTutorsById);

module.exports = router;

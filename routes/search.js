const express = require('express');
const searchController = require('../controllers/search');

const router = express.Router();

router.get('/tutors', searchController.getTutors);

router.get('/tutors/:id', searchController.getTutorById);

module.exports = router;

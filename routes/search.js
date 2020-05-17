const express = require('express');
const searchController = require('../controllers/search');

const router = express.Router();

router.get('/api/tutors', searchController.getTutors);

module.exports = router;

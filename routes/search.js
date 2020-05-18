const express = require('express');
const searchController = require('../controllers/search');

const router = express.Router();

router.get('/', searchController.getTutors);

router.get('/:id', searchController.getTutorById);

module.exports = router;

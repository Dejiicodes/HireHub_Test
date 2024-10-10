// routes/ratingRoutes.js
const express = require('express');
const { addRating, getUserRatings } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/add', authMiddleware, addRating);
router.get('/user/:userId', getUserRatings);

module.exports = router;

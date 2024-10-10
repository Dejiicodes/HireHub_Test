const express = require('express');
const { applyToJob, getApplicationsForJob, updateApplicationStatus } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/apply', authMiddleware, applyToJob);
router.get('/job/:jobId', authMiddleware, getApplicationsForJob);
router.put('/update-status/:appId', authMiddleware, updateApplicationStatus);

module.exports = router;

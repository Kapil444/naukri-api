const express = require('express');
const router = express.Router();
const jobController = require('../controller/jobController')

router.post('/create',jobController.createJob);
router.get('/all',jobController.getAllJobs);
router.get('/recruiter/:recId',jobController.getJobsByRecruiter);
router.get('/:jobId',jobController.getById);

module.exports = router;
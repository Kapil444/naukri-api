const express = require('express');
const router = express.Router();
const applicantController = require('../controller/applicantController')

router.post('/create',applicantController.postApplicant);

router.get("/job/:jobId",applicantController.getByJobId);

router.get("/job/candidate/:jobId/:candidateId",applicantController.getByJobIdAndCandidateId);

router.get("/candidate/:candidateId",applicantController.getByCandidateId)

module.exports = router;
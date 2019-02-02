const express = require('express');
const router = express.Router();

const request = require('../models/request');
// const student = require('../models/student');

const sendRequests = ((req,res) => res.json(res.locals.requests))
const sendRequest = ((req,res) => res.json(res.locals.request))

router.get('/students/:studnet_id', request.getAllStudentReq ,sendRequests);
router.get('/tutors/:tutor_id', request.getAllTutorReq ,sendRequests);
router.post('/', request.create ,sendRequest);
router.put('/:req_id', request.update ,sendRequest);

module.exports = router;

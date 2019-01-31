const express = require('express');
const router = express.Router();

const student = require('../models/student');

const sendStudent = ((req,res) => res.json(res.locals.student));

router.get('/:id',student.find,sendStudent);
router.put('/:id',student.update,sendStudent);
router.post('/',student.create,sendStudent);

module.exports = router;
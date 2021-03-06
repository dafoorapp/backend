const express = require('express');
const router = express.Router();

const student = require('../models/student');

const sendStudent = ((req,res) => res.json(res.locals.student));

router.get('/:user_id',student.find,sendStudent);
router.put('/:user_id',student.update,sendStudent);
router.post('/',student.create,sendStudent);

module.exports = router;

//Checked
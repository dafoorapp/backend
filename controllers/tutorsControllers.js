const express = require('express');
const router = express.Router();

const tutor = require('../models/tutor');

const sendTutors = ((req,res) => res.json(res.locals.tutors));
const sendTutor = ((req,res) => res.json(res.locals.tutor));

router.get('/category',tutor.getByCategory,sendTutors);
router.get('/students/:stu_id',tutor.getByStudentLocation,sendTutors);
router.get('/:id',tutor.find,sendTutor);

router.put('/:id',tutor.update,sendTutor);
router.post('/',tutor.create,sendTutor);

module.exports = router;
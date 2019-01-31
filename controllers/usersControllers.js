const express = require('express');
const router = express.Router();

const user = require('../models/user');

const sendUser = ((req,res) => res.json(res.locals.user));

router.get('/', user.find ,sendUser);
router.post('/', user.create ,sendUser);

module.exports = router;
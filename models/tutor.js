const db = require('../db/config');
const tutor = {};

// can we set defult value to the state
tutor.create = function (req, res, next) {
    db.one("INSERT INTO tutors (name, gender, phone_number, location, rating, subject, price , state, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, false, $9) RETURNING *;",
    [req.body.name, req.body.gender, req.body,phone_number, req.body.location, req.body.rating, req.body.subject, req.body.price, req.body.user_id])
    .then(result => {
        res.locals.tutor = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

//find user params or body
tutor.find = function (req, res, next) {
    db.oneOrNone("SELECT * FROM tutors WHERE user_id=$1;",
    [req.params.user_id])
    .then(result => {
        res.locals.tutor = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

tutor.update = function (req, res, next) {
    db.one("UPDATE tutors SET name=$1, gender=$2, phone_number=$3, location=$4, rating=$5, subject=$6, price=$7, state=$8 WHERE user_id=$5 RETURNING *;", 
    [req.body.name, req.body.gender, req.body,phone_number, req.body.location, req.body.rating, req.body.subject, req.body.price, req.body.state, req.params.user_id])
    .then(result => {
        res.locals.tutor = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

// req.body.student_location
tutor.getByStudentLocation = function (req, res, next) {
    db.manyOrNone("SELECT * FROM tutors WHERE ST_DWithin($1, tutors.location, 100);",
    [req.body.student_location])
    .then(result => {
        res.locals.tutors = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

// req.body.category
// $1 = ANY (subject);

tutor.getByCategory = function (req, res, next) {
    db.manyOrNone("SELECT * FROM tutors WHERE subject=$1;",
    [req.body.category])
    .then(result => {
        res.locals.tutors = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

module.exports = tutor;
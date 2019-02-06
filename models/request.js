const db = require('../db/config');
const request = {};

request.create = function (req, res, next) {
    db.one("INSERT INTO requests (subject, duration, cost, student_id, tutor_id, status, date) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *;",
    [req.body.subject, req.body.duration, req.body.cost, req.body.student_id, req.body.tutor_id, req.body.status])
    .then(result => {
        res.locals.request = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

request.getAllStudentReq = function (req, res, next) {
    // SELECT * from requests, students where requests.student_id = students.user_id AND ;
    // SELECT requests.student_id, requests.tutor_id, requests.subject, requests.duration, requests.cost, requests.status, requests.date, tutors.name FROM requests, tutors WHERE student_id=$1 AND requests.tutors_id = tutors.user_id;
    db.manyOrNone("SELECT requests.id, requests.student_id, requests.tutor_id, requests.subject, requests.duration, requests.cost, requests.status, requests.date, tutors.name, tutors.gender, tutors.phone_number FROM requests, tutors WHERE student_id=$1 AND requests.tutor_id = tutors.user_id;",
    [req.params.studnet_id])
    .then(result => {
        console.log(result);
        res.locals.requests = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

// SELECT * FROM requests INNER JOIN tutors ON (requests.tutor_id = 2) WHERE (studnet_id=$1) AND (status='active' OR status='pending');

request.getAllTutorReq = function (req, res, next) {
    // SELECT requests.student_id, requests.tutor_id, requests.subject, requests.duration, requests.cost, requests.status, requests.date, tutors.name FROM requests, students WHERE tutor_id=$1 AND requests.student_id = students.user_id;
    //SELECT requests.student_id, requests.tutor_id, requests.subject, requests.duration, requests.cost, requests.status, requests.date, students.name FROM requests INNER JOIN students ON (requests.student_id = students.user_id) WHERE (tutor_id=2);
    db.manyOrNone("SELECT requests.id, requests.student_id, requests.tutor_id, requests.subject, requests.duration, requests.cost, requests.status, requests.date, students.name, students.gender, students.phone_number , students.ST_X(location), students.ST_Y(location) FROM requests, students WHERE tutor_id=$1 AND requests.student_id = students.user_id;",
    [req.params.tutor_id])
    .then(result => {
        res.locals.requests = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

request.update = function (req, res, next) {
    db.one("UPDATE requests SET status=$1 WHERE id=$2 RETURNING *;",
    [req.body.status, req.params.req_id])
    .then(result => {
        console.log(result);
        res.locals.request = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

module.exports = request;
const db = require('../db/config');
const request = {};

request.create = function (req, res, next) {
    db.one("INSERT INTO requests (subject, duration, cost, studnet_id, tutor_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
    [req.body.subject, req.body.duration, req.body.cost, req.body.studnet_id, req.body.tutor_id, req.body.status])
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
    db.manyOrNone("SELECT * FROM requests WHERE (studnet_id=$1) AND (status='active' OR status='pending');",
    [req.params.studnet_id])
    .then(result => {

        res.locals.requests = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

request.getAllTutorReq = function (req, res, next) {
    db.manyOrNone("SELECT * FROM requests WHERE tutor_id=$1",
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
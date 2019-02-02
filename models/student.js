const db = require('../db/config');
const student = {};

// req.body.user_id
student.create = function (req, res, next) {
    let location = req.body.location;

    db.one(`INSERT INTO students (name, gender, phone_number, location, user_id) VALUES ($1, $2, $3, ST_GeomFromText('POINT(${location})',4326), $5) RETURNING *;`,
    [req.body.name, req.body.gender, req.body.phone_number, req.body.location, req.body.user_id])
    .then(result => {
        res.locals.student = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

//find user 
student.find = function (req, res, next) {
    console.log('jsdjsajd');
    db.oneOrNone("SELECT * FROM students WHERE user_id=$1;",
    [req.params.user_id])
    .then(result => {
        console.log(result);
        res.locals.student = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

//req.params.user_id
student.update = function (req, res, next) {
    const location = req.body.location;
    console.log(req.params.user_id);
    db.one(`UPDATE students SET name=$1, gender=$2, phone_number=$3, location = ST_GeomFromText('POINT(${location})',4326) WHERE user_id=$4 RETURNING *;`, 
    [req.body.name, req.body.gender, req.body.phone_number ,req.params.user_id])
    .then(result => {
        res.locals.student = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

module.exports = student;
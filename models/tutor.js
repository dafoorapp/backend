const db = require('../db/config');
const tutor = {};

// can we set defult value to the state
tutor.create = function (req, res, next) {
    const location = req.body.location;
    db.one(`INSERT INTO tutors (name, gender, phone_number, location, rating, subject, price , state, user_id) VALUES ($1, $2, $3, ST_GeomFromText('POINT(${location})',4326), $4, $5, $6, false, $7) RETURNING *;`,
    [req.body.name, req.body.gender, req.body.phone_number, req.body.rating, req.body.subject, req.body.price, req.body.user_id])
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

// subject = '{"Math" ,"Computer"}'
tutor.update = function (req, res, next) {
    const location = req.body.location;
    db.one(`UPDATE tutors SET name=$1, gender=$2, phone_number=$3, location=ST_GeomFromText('POINT(${location})',4326), rating=$4, subject=$5, price=$6, state=$7 WHERE user_id=$8 RETURNING *;`, 
    [req.body.name, req.body.gender, req.body.phone_number, req.body.rating, req.body.subject, req.body.price, req.body.state, req.params.user_id])
    .then(result => {
        res.locals.tutor = result;
        next();
    })
    .catch(error => {
        console.log(error);
        next();
    })
}

// req.body.student_location
// student_location = 0101000020E6100000D2A00D654DA938403CD1BF6E22574740
tutor.getByStudentLocation = function (req, res, next) {
    db.manyOrNone("SELECT ST_X(location),ST_Y(location) FROM tutors WHERE ST_DWithin($1, tutors.location, 1);",
    [req.query.student_location])
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
    console.log(req.body.category);
    const category = req.body.category;
    db.manyOrNone(`SELECT * FROM tutors WHERE subject && '{${category}}';`)
    .then(result => {
        console.log(result);
        res.locals.tutors = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

module.exports = tutor;
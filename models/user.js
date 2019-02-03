const db = require('../db/config');
const user = {};

user.create = function (req, res, next) {
    db.one("INSERT INTO users (email, type) VALUES ($1, $2) RETURNING *;",
    [req.body.email.toLowerCase(), req.body.type])
    .then(result => {
        res.locals.user = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

// find user by email
user.find = function (req, res, next) {
    db.oneOrNone("SELECT * FROM users WHERE email=$1;",
    [req.params.email])
    .then(result => {
        res.locals.user = result;
        next()
    })
    .catch(error => {
        console.log(error);
        next()
    })
}

module.exports = user;
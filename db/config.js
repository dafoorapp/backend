const pgPromise = require('pg-promise');
const pgInstance = pgPromise();
 
const config = {
   host: 'localhost',
   port: 5432,
   database: 'dafoor',
   user: 'yahyamo.' // your username here!!
}
 
const connection = pgInstance(config);
 
module.exports = connection; 
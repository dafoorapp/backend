const express = require('express');
const PORT = process.env.port || 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const requestsControllers = require('./controllers/requestsControllers');
const studentsControllers = require('./controllers/studentsControllers');
const tutorsControllers = require('./controllers/tutorsControllers');
const usersControllers = require('./controllers/usersControllers');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use('/requests' , requestsControllers);
app.use('/students' , studentsControllers);
app.use('/tutors' , tutorsControllers);
app.use('/users' , usersControllers);

app.get('/', (req, res) => {
  res.send('HI');
})

app.listen(port, () => {
  console.log('listening on localhost:' + PORT);
}); 
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const red = require('./api/red');
const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/', () => {
//   red();
// });
// add router
app.use('/red', red);

module.exports = app;
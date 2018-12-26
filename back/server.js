require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];


/* eslint no-unused-vars: "error" */
const User = require('./models/userModel');
const Token = require('./models/tokenModel');
const Aliment = require('./models/alimentModel');
const Measurement = require('./models/measurementModel');
const Macro = require('./models/macroModel');
// const Day = require('./app/models/dayModel');

mongoose.connect('mongodb://127.0.0.1/calories', { useNewUrlParser: true });

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes/alimentRoutes')(app);
require('./routes/measurementRoutes')(app);
require('./routes/tokenRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/macroRoutes')(app);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(`${stage.port}`, () => {
  console.log(`Server online on ${stage.port}`);
});

module.exports = app;

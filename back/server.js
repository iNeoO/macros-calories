const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

/* eslint no-unused-vars: "error" */
const User = require('./models/userModel');
const Token = require('./models/tokenModel');
// const Aliment = require('./models/alimentModel');
// const Day = require('./app/models/dayModel');

mongoose.connect('mongodb://127.0.0.1/callories', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/userRoutes');
// const routes = require('./routes/tokenRoutes');
// require('./routes')(app);
routes(app);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port);

console.log(`Server online on ${port}`);

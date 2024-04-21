const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');
const {logReqRes } = require('./middlewares');
const app = express();

app.use(bodyParser.json());
app.use('/', routes);
app.use(logReqRes('log.txt'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
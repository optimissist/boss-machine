const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

module.exports = app;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

const minionsRouter = require('./server/minions');
app.use('/minions', minionsRouter);


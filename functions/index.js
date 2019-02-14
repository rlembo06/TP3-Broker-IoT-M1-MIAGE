const functions = require('firebase-functions');
const express = require('express');
const app = express();

const cors = require('cors')({origin: true});

const test = require('./routes/test.routes.js');

app.use(cors);

// Import API Routes
app.use('/test', test);

exports.app = functions.https.onRequest(app);
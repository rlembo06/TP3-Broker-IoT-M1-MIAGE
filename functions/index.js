const functions = require('firebase-functions');
const express = require('express');
const app = express();

const cors = require('cors')({origin: true});

const items = require('./routes/items.routes.js');

app.use(cors);

// Import API Routes
app.use('/items', items);

exports.app = functions.https.onRequest(app);
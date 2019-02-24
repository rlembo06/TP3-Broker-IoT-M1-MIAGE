const functions = require('firebase-functions');
const express = require('express');
const subscribeMqtt = require('./mqtt/subscriber');
const { topics: { test: topicTest, temperatures, brightnesses } } = require('./constants/mqtt'); // provisoire
const app = express();

const cors = require('cors')({origin: true});

const test = require('./routes/test.routes.js');

app.use(cors);

subscribeMqtt.subscribe(temperatures);
subscribeMqtt.subscribe(brightnesses);
subscribeMqtt.getMessages();

// Import API Routes
app.use('/test', test);

exports.app = functions.https.onRequest(app);
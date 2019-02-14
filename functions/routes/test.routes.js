const express = require('express');
const app = express();

const models = require('../models/test.models');

app.get('/', (req, res) => res(models.bigBen(res)));
app.get('/ping', (req, res) => res(models.pong(res)));
app.get('/firestoreTest', async (req, res) => await res(models.firestoreTest(res)));

module.exports = app;
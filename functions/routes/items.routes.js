const express = require('express');
const app = express();

const models = require('../models/items.models');

app.get('/', (req, res) => res(models.bigBen(res)));
app.get('/ping', (req, res) => res(models.pong(res)));

module.exports = app;
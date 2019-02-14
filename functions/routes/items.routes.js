const express = require('express');
const app = express();

const models = require('../models/items.models');

app.get('/', (req, res) => res(models.bigBen(res)));

module.exports = app;
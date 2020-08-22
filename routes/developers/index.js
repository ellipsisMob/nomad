const developers = require('express').Router();
const all = require('./all');

developers.get('/', all);

module.exports = developers;
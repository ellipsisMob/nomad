const developers = require('express').Router();
const all = require('./allDevs');
const single = require('./singleDev');

developers.get('/:id', single);
developers.get('/', all);

module.exports = developers;
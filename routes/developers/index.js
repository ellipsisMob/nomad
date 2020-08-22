const developers = require('express').Router();
const all = require('./allDevs');
const single = require('./singleDev');
const createDev = require('./createDev');

developers.get('/:id', single);
developers.get('/', all);
developers.post('/', createDev);

module.exports = developers;
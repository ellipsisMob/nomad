const developers = require('express').Router();
const all = require('./allDevs');
const single = require('./singleDev');
const createDev = require('./createDev');
const login = require('./login');

developers.get('/:id', single);
developers.get('/', all);
developers.post('/', createDev);
developers.post('/login', login);

module.exports = developers;
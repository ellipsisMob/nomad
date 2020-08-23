const developers = require('express').Router();
const { FBAuth } = require('../../firebaseUtils');
const all = require('./allDevs');
const single = require('./singleDev');
const createDev = require('./createDev');
const login = require('./login');

developers.get('/:id', single);
// developers.get('/:id', FBAuth, single);
developers.get('/', all);
developers.post('/', createDev);
developers.post('/login', login);

module.exports = developers;
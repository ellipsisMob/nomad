const developers = require('express').Router();
// const single = require('./singleEvent');
const all = require('./allEvents');

// developers.get('/:id', single);
developers.get('/', all);

module.exports = developers;
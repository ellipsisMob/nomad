const events = require('express').Router();
// const single = require('./singleEvent');
const all = require('./allEvents');
const createEvent = require('./createEvent');
// const { app } = require('firebase');



// developers.get('/:id', single);
events.get('/', all);
events.post('/', createEvent);

module.exports = events;
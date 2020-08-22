const posts = require('express').Router();
const single = require('./singlePost');
const all = require('./allPosts');

posts.get('/:id', single);
posts.get('/', all);

module.exports = posts;
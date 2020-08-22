const posts = require('express').Router();
const single = require('./singlePost');
const all = require('./allPosts');
const createPost = require('./createPost');
const deletePost = require('./deletePost');

posts.get('/:id', single);
posts.get('/', all);
posts.post('/', createPost);
posts.delete('/:id', deletePost);

module.exports = posts;

const routes = require('express').Router();
const developers = require('./developers');
const posts = require('./posts');
const events = require('./events');

routes.use('/developers', developers);
routes.use('/posts', posts);
routes.use('/events', events);

routes.get('/', (req, res) => {
  res.status(200).json({
    developers: '/api/developers',
    posts: '/api/posts',
    events: '/api/events',
  });
});

module.exports = routes;
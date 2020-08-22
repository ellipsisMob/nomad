const routes = require('express').Router();
const models = require('./models');
const developers = require('./developers');

routes.use('/models', models);
routes.use('/developers', developers);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
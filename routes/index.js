const routes = require('express').Router();
const artists = require('./artists');

routes.use('/artists', artists);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;

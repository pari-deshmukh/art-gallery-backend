'use strict';

const controller = require('./artist.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/artists`,
  });

  router
    .get('/:artistId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};

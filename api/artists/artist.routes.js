'use strict';

const controller = require('./artist.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/artists`,
  });

  router
    .get('/:id', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne)
    .put('/:id', controller.modifyOne)
    .delete('/:id', controller.deleteOne);

  return router;
};

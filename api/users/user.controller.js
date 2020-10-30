'use strict';

const generateId = require('../../utils/generateId.util');

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = require('../../db/users.json');

exports.getOne = ctx => {
  const { userId } = ctx.params;
  const user = db.users.find(user => user.id === userId);
  ctx.assert(user, 404, "The requested user doesn't exist");
  ctx.status = 200;
  ctx.body = user;
};

exports.getAll = async ctx => {
  ctx.status = 200;
  ctx.body = db.users;
};

exports.createOne = async ctx => {
  const { name } = ctx.request.body;
  ctx.assert(name, 400, 'The user info is malformed!');
  const id = generateId();
  const newUser = {
    id,
    name,
    timestamp: Date.now(),
  };
  db.users.push(newUser);
  const createdUser = db.users.find(user => user.id === id);
  ctx.status = 201;
  ctx.body = createdUser;
};

'use strict';
const User = require('../../db/models/users');

const catchErr = (ctx, err) => {
  ctx.status = 500;
  ctx.body = {
    status: 'error',
    message: err.message || 'Sorry, an error has occurred.',
  };
};

exports.getOne = async ctx => {
  try {
    const { id } = ctx.params;
    const user = await User.findById(id);
    ctx.assert(user, 404, "The requested user doesn't exist");
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: user,
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

exports.getAll = async ctx => {
  try {
    const users = await User.find();
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: users,
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

exports.createOne = async ctx => {
  try {
    const { name } = ctx.request.body;
    ctx.assert(name, 400, 'The user info is malformed!');

    let user = new User(ctx.request.body);
    user.created_at = Date.now();

    const createdUser = await user.save();
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: createdUser,
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

exports.modifyOne = async ctx => {
  try {
    const { id } = ctx.params;
    const { name } = ctx.request.body;
    ctx.assert(name, 400, 'The user info is malformed!');

    let user = await User.findById(id);
    user.name = name;
    const updatedUser = await user.save();
    ctx.assert(updatedUser, 404, 'The user does not exist!');

    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: updatedUser,
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

exports.deleteOne = async ctx => {
  try {
    const { id } = ctx.params;
    await User.remove({ _id: id });
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      message: 'User has been removed!',
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

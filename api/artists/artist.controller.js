'use strict';
const Artist = require('../../db/models/artist');

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
    const artist = await Artist.findById(id);
    ctx.assert(artist, 404, "The requested artist doesn't exist");
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: artist,
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

exports.getAll = async ctx => {
  try {
    const artists = await Artist.find();
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: artists,
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

exports.createOne = async ctx => {
  try {
    const { name, contact, items } = ctx.request.body;
    ctx.assert(name && contact && items, 400, 'The artist info is malformed!');

    let artist = new Artist(ctx.request.body);
    artist.created_at = Date.now();

    const createdArtist = await artist.save();
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: createdArtist,
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

exports.modifyOne = async ctx => {
  try {
    const { id } = ctx.params;
    const { name, contact, items } = ctx.request.body;
    ctx.assert(name && contact && items, 400, 'The artist info is malformed!');

    let artist = await Artist.findById(id);
    artist.name = name;
    artist.contact = contact;
    artist.items = items;
    const updatedArtist = await artist.save();
    ctx.assert(updatedArtist, 404, 'The artist does not exist!');

    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: updatedArtist,
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

exports.deleteOne = async ctx => {
  try {
    const { id } = ctx.params;
    await Artist.remove({ _id: id });
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      message: 'Artist has been removed!',
    };
  } catch (err) {
    catchErr(ctx, err);
  }
};

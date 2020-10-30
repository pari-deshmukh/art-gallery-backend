'use strict';

const generateId = require('../../utils/generateId.util');

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = {
  artists: [
    {
      name: 'Terry Wylde ',
      contact: '0762718468',
      items: [
        {
          name: 'Beach Days',
          status: 'sold',
          price: '£50',
          image: 'Images/beachdays.png',
        },
        {
          name: 'Beach Days',
          status: 'sold',
          price: '£50',
          image: 'Images/beachdays.png',
        },
        {
          name: 'Beach Days',
          status: 'sold',
          price: '£50',
          image: 'Images/beachdays.png',
        },
        {
          name: 'Beach Days',
          status: 'sold',
          price: '£50',
          image: 'Images/beachdays.png',
        },
      ],
    },
    {
      name: 'Richard Hopkinson ',
      contact: '0788219377',
      items: [
        {
          name: 'Warp Drive',
          status: 'for sale',
          price: '£300',
          image: 'Images/wrapdrive.png',
        },
      ],
    },
    {
      name: 'Gill Bustamante ',
      contact: '07532709114',
      item: [
        {
          name: 'Summer Dissolving',
          status: 'sold',
          price: '£1,350',
          image: 'Images/summerdissolving.png',
        },
      ],
    },
  ],
};

exports.getOne = ctx => {
  const { artistId } = ctx.params;
  const artist = db.artists.find(artist => artist.id === artistId);
  ctx.assert(artist, 404, "The requested artist doesn't exist");
  ctx.status = 200;
  ctx.body = artist;
};

exports.getAll = async ctx => {
  ctx.status = 200;
  ctx.body = db.artists;
};

exports.createOne = async ctx => {
  const { name } = ctx.request.body;
  ctx.assert(name, 400, 'The artist info is malformed!');
  const id = generateId();
  const newArtist = {
    id,
    name,
    timestamp: Date.now(),
  };
  db.artists.push(newArtist);
  const createdArtist = db.artists.find(artist => artist.id === id);
  ctx.status = 201;
  ctx.body = createdArtist;
};

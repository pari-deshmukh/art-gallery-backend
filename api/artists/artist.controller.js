'use strict';

const generateId = require('../../utils/generateId.util');

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = {
    artists: [
    {
        "Artist name":"Terry Wylde ",
        "Item name":"Beach Days",
        "Contact":"0762718468",
        "Price":"£50",
        "Status":"sold",
        "Image":"Images/beachdays.png"
    },
    {
        "Artist name":"Richard Hopkinson ",
        "Item name":"Warp Drive",
        "Contact":"0788219377",
        "Price":"£300",
        "Status":"for sale",
        "Image": "Images/wrapdrive.png"
    },
    {
        "Artist name":"Gill Bustamante ",
        "Item name":"Summer Dissolving",
        "Contact":"07532709114",
        "Price":"£1,350",
        "Status":"sold",
        "Image":"Images/summerdissolving.png"
    },
    {
        "Artist name":"Linda Drury",
        "Item name":"The Hedgerow",
        "Contact":"07637281632",
        "Price":"£90",
        "Status":"forsale",
        "Image":"Images/thehedgerow.png"
    },
    {
        "Artist name":"Claire White ",
        "Item name":"Falling Cloudberries",
        "Contact":"0766382976",
        "Price":"£75",
        "Status":"for sale",
        "Image":"Images/fallingcloudberries.png"
    }
]}

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

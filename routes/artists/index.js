const artists = require('express').Router();
const all = require('./all');

artists.get('/', all);

module.exports = artists;
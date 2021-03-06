const mongoose = require('mongoose');

const item = mongoose.Schema({
  name: String,
  status: String,
  price: String,
  image: String,
});

const artistSchema = mongoose.Schema({
  name: String,
  contact: String,
  items: [item],
  created_At: Date,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;

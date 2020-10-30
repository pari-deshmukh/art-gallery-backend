const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: String,
  name: String,
  created_at: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

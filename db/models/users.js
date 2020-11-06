const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  created_at: Date,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

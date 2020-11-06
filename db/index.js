/**
 * Create a new connection to mongodb
 */
const mongoose = require('mongoose');
const path = require('path');
const glob = require('glob');

// Import db configuration.
const { databaseConfig } = require('../config');

// Build the base connection string
const connectionString =
  databaseConfig.host +
  ':' +
  databaseConfig.port +
  '/' +
  databaseConfig.database;

// Check for DB access credentials
let credentialsString = '';
if (databaseConfig.user && databaseConfig.password) {
  credentialsString = databaseConfig.user + ':' + databaseConfig.password + '@';
}

// Build the mongo connection URI
let mongoURI = 'mongodb://' + credentialsString + connectionString;

// Create the database connection
const connection = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * Handle connection events
 */

// When successfully connected
mongoose.connection.on('connected', function(ref) {
  console.log('Mongoose default connection open to ' + mongoURI);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

/**
 * Import all data models
 */
glob.sync('./models/*.js').forEach(function(file) {
  require(path.resolve(file));
});

module.exports = connection;

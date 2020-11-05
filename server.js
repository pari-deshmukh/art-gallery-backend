/**
 * Import all required dependencies
 */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')(/* Add your cors option */);
const helmet = require('koa-helmet')(/* Add your security option */);
const logger = require('koa-logger')();

/**
 * Import and apply the error and API middlewares
 */
const errorHandler = require('./middleware/error.middleware');
const applyApiMiddleware = require('./api');

/**
 * Import env configuration.
 */
const { isDevelopment } = require('./config');

/**
 * Import db connection.
 */
require('./db');

const server = new Koa();

/**
 * Add here only development middlewares
 */
if (isDevelopment) {
  server.use(logger);
}

/**
 * Pass to our server instance middlewares
 */
server
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser);

/**
 * Apply to our server the api router
 */
applyApiMiddleware(server);

module.exports = server;

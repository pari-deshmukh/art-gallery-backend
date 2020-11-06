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
 * Import db connection.
 */
require('./db');

/**
 * Import and apply the error and API middlewares
 */
const errorHandler = require('./middleware/error.middleware');
const applyApiMiddleware = require('./api');

/**
 * Import env configuration.
 */
const { isDevelopment } = require('./config');

const app = new Koa();

/**
 * Add here only development middlewares
 */
if (isDevelopment) {
  console.log('Running in Development Mode!');
  app.use(logger);
}

/**
 * Pass to our app instance middlewares
 */
app
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser);

/**
 * Apply to our app the api router
 */
applyApiMiddleware(app);

module.exports = app;

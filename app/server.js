const express = require('express');
const bodyParser = require('body-parser');

const { logger } = require('./lib');
const { errorHandler } = require('./middlewares');
const routes = require('./routes');

const PORT = 3000;

(async () => {
  const app = createServer();
  app.listen(PORT);
  logger.info(`Server listening in port ${PORT}`);
})();

function createServer () {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(routes);
  app.use(errorHandler);

  return app;
}

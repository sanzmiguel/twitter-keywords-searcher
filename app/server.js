const express = require('express');
const bodyParser = require('body-parser');

const { logger } = require('./lib');
const { errorHandler } = require('./middlewares');
const routes = require('./routes');
const {
  kafka: { connect: kafkaConnect },
  twitter: { connect: twitterConnect }
} = require('./lib');
const { connect: elasticConnect } = require('./repository/elastic');

const PORT = process.env.PORT;

(async () => {
  try {
    const app = createServer();
    await Promise.all([
      kafkaConnect(),
      elasticConnect()
    ]);
    twitterConnect();
    app.listen(PORT);
    logger.info(`Server listening in port ${PORT}`);
  } catch (error) {
    logger.error('An error has occurred. Server is disconnecting', error);
    process.exit(-1);
  }
})();

function createServer () {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(routes);
  app.use(errorHandler);

  return app;
}

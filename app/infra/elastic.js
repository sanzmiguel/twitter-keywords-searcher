const { Client, ConnectionPool } = require('@elastic/elasticsearch');

const { logger } = require('../lib');

let client;

async function connect () {
  try {
    logger.info('Creating connection to Elastic');
    client = new Client({
      apiVersion: '6.8',
      requestTimeout: 600000,
      ConnectionPool,
      log: 'trace',
      node: 'http://localhost:9200'
    });
    await client.ping();
  } catch (error) {
    logger.error(`The connection with elastic did not work: ${error}`);
    throw error;
  }
}

function getClient () {
  return client;
}

module.exports = {
  connect,
  getClient
};

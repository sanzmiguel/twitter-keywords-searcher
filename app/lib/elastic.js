const { Client, ConnectionPool } = require('@elastic/elasticsearch');

const logger = require('./logger');

let client;

async function connect () {
  try {
    logger.info('Creating connection to Elastic');
    client = new Client({
      apiVersion: '6.8',
      requestTimeout: 600000,
      ConnectionPool,
      log: 'trace',
      node: process.env.ELASTIC_HOST
    });
    await client.ping();
  } catch (error) {
    logger.error(`The connection with elastic did not work: ${error}`);
    throw error;
  }
}

module.exports = {
  connect
};

const { Client, ConnectionPool } = require('@elastic/elasticsearch');

const logger = require('../lib/logger');

const tweetsMapping = require('./tweets.mapping.json');

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
    await _deleteTweetsIndex();
    await _createTweetsIndex();
  } catch (error) {
    logger.error(`The connection with elastic did not work: ${error}`);
    throw error;
  }
}

async function _createTweetsIndex () {
  logger.info('Creating tweets index in ElasticServer');
  const { mappings, settings } = tweetsMapping;
  const options = {
    index: process.env.ELASTIC_TWEETS_INDEX_NAME,
    body: { mappings, settings }
  };
  const { indices } = client;

  await indices.create(options);
}

async function _deleteTweetsIndex () {
  try {
    logger.info('Deleting tweets index in ElasticSearch');
    const { indices } = client;
    await indices.delete({ index: process.env.ELASTIC_TWEETS_INDEX_NAME });
  } catch (error) {
    logger.error('Error deleting tweets index in ElasticSearcg');
  }
}

async function insertTweetDocument (tweet) {
  logger.info('Inserting document in ElasticSearch');
  const options = {
    body: [
      {
        index: {
          _index: process.env.ELASTIC_TWEETS_INDEX_NAME,
          _type: process.env.ELASTIC_TWEETS_TYPE
        }
      },
      tweet
    ]
  };
  await client.bulk(options);
}

module.exports = {
  connect,
  insertTweetDocument
};

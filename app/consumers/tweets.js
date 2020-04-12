const { unserializeFromKafka } = require('../dto/tweets');
const logger = require('../lib/logger');
const { insertTweetDocument } = require('../repository/elastic');

async function tweetsConsumer ({ topic, message }) {
  try {
    logger.info(`Consuming from kafka topic ${topic}`);
    const tweet = unserializeFromKafka(message.value.toString());
    await insertTweetDocument(tweet);
  } catch (error) {
    logger.error('Error inserting tweet in ElasticSearch', error);
  }
}

module.exports = tweetsConsumer;

const { logger, twitter, kafka } = require('../../lib');
const { serializeToKafka } = require('../../dto/tweets');

async function addKeywordsSearch (keyword) {
  logger.info(`Adding keywords search with the keyword ${keyword}`);
  const tweets = await twitter.search(keyword);
  const serializedTweets = serializeToKafka(tweets);
  await kafka.sendToTopic(serializedTweets);
}

module.exports = {
  addKeywordsSearch
};

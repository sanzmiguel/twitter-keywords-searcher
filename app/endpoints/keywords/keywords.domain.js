const { logger, twitter } = require('../../lib');

async function addKeywordsSearch (keyword) {
  logger.info(`Adding keywords search with the keyword ${keyword}`);
  const tweets = await twitter.search(keyword);
  return tweets;
}

module.exports = {
  addKeywordsSearch
};

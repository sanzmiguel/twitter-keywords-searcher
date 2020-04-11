const { logger, twitter, kafka } = require('../../lib');

async function addKeywordsSearch (keyword) {
  logger.info(`Adding keywords search with the keyword ${keyword}`);
  const tweets = await twitter.search(keyword);
  const mappedTweets = tweets.map(tweet => ({
    tweet: tweet.text,
    lang: tweet.lang,
    createdAt: tweet.created_at,
    userName: tweet.user.name,
    userDescription: tweet.user.description
  }));
  for (const tweet of mappedTweets) {
    await kafka.sendToTopic(tweet, tweet.userName);
  }
  return mappedTweets;
}

module.exports = {
  addKeywordsSearch
};

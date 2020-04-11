function serializeToKafka (tweets) {
  return tweets.map(tweet => ({
    key: tweet.user.name,
    value: JSON.stringify({
      tweet: tweet.text,
      lang: tweet.lang,
      createdAt: tweet.created_at,
      userName: tweet.user.name,
      userDescription: tweet.user.description
    })
  }));
}

function unserializeFromKafka (tweet) {
  return JSON.parse(tweet);
}

module.exports = {
  serializeToKafka,
  unserializeFromKafka
};

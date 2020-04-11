const Twitter = require('twitter');

let client;

function connect () {
  client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
}

async function search (keyword) {
  return new Promise((resolve, reject) => {
    client.get('search/tweets', { q: keyword }, (error, tweets, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(tweets.statuses);
    });
  });
}

module.exports = {
  connect,
  search
};

const { logger } = require('../../lib');

async function addKeywordsSearch (keyword) {
  logger.info(`Adding keywords search with the keyword ${keyword}`);
}

module.exports = {
  addKeywordsSearch
};

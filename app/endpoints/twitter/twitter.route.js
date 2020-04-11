const { Router } = require('express');
const { NO_CONTENT } = require('http-status');

const twitterDomain = require('./twitter.domain');
const { schemaValidator } = require('../../middlewares');
const { addKeywordsSearch: addKeywordsSearchValidator } = require('./validators');

const router = Router();

async function addKeywordsSearch (req, res, next) {
  const { keyword } = req.body;
  twitterDomain.addKeywordsSearch(keyword);
  res.status(NO_CONTENT).send();
  next();
}

router.post(
  '/add-keywords-search',
  schemaValidator([
    { path: 'body', schema: addKeywordsSearchValidator }
  ]),
  addKeywordsSearch
);

module.exports = router;

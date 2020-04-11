const { Router } = require('express');
const { NO_CONTENT } = require('http-status');

const twitterDomain = require('./keywords.domain');
const { schemaValidator } = require('../../middlewares');
const { addKeywordsSearch: addKeywordsSearchValidator } = require('./validators');

const router = Router();

async function addKeywordsSearch (req, res, next) {
  const { keyword } = req.body;
  await twitterDomain.addKeywordsSearch(keyword);
  res.status(NO_CONTENT).send();
  next();
}

router.post(
  '/add-search',
  schemaValidator([
    { path: 'body', schema: addKeywordsSearchValidator }
  ]),
  addKeywordsSearch
);

module.exports = router;

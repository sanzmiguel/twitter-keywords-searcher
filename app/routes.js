const { Router } = require('express');

const keywordsRoute = require('./endpoints/keywords/keywords.route');

const router = Router();

router.use('/api/keywords', keywordsRoute);

module.exports = router;

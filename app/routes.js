const { Router } = require('express');

const twitterRoute = require('./endpoints/twitter/twitter.route');

const router = Router();

router.use('/api/twitter', twitterRoute);

module.exports = router;

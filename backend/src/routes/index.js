const router = require('express').Router();

router.use('/users', require('../modules/user/user.routes'));
router.use('/clients', require('../modules/client/client.routes'));
router.use('/campaigns', require('../modules/campaign/campaign.routes'));

module.exports = router;

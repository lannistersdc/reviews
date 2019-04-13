const router = require('express').Router();
const controller = require('./controller.js');

router.route('/restaurant/:_id').get(controller.get);

module.exports = router;

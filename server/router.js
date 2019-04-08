const router = require('express').Router();
const controller = require('./controller.js');

router.route('/restaurants/:_id').get(controller.get);

module.exports = router;

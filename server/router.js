const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/restaurant/:_id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.delete);

router
  .route('/restaurant')
  .post(controller.post);

module.exports = router;
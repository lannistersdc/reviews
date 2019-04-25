const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/restaurant/:_id')
  .get(controller.get)

router
  .route('/restaurant')
  .post(controller.post)
  .put(controller.put)
  .delete(controller.delete);

module.exports = router;
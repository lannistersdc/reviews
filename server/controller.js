const Review = require('../database/index.js');

const controller = {
  get: (req, res) => {
    const _id = req.params;
    Review.find({ restaurantID: _id })
      .sort({ date: -1 })
      .then(docs => res.status(200).send(docs))
      .catch(err => console.error(err));
  }
};

module.exports = controller;

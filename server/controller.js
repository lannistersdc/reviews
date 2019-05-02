const Review = require('../database/index.js');

const controller = {
  get: (req, res) => {
    const _id = req.params._id;
    Review.find({
        restaurantID: _id
      })
      .then(docs => res.status(200).send(docs))
      .catch(err => res.status(404).send(err));
  },
  post: (req, res) => {
    Review
      .find({})
      .sort({
        id: -1
      })
      .limit(1)
      .then((data) => {
        var id = (data[0].id) + 1;
        var newRev = req.body;
        newRev.id = id;
        Review
          .create(newRev)
          .then(() => {
            res.status(201).send('Review added');
          })
          .catch(err => res.status(404).send(err))
      })
  },
  put: (req, res) => {
    Review
      .findOneAndUpdate({
        id: req.body.id
      }, req.body)
      .then((data) => {
        res.status(201).send(data)
      })
      .catch(err => res.status(404).send(err))
  },
  delete: (req, res) => {
    Review
      .findOneAndDelete({
        id: req.body.id
      })
      .then(data => {
        res.status(201).send(data)
      })
      .catch(err => res.status(404).send(err))
  }
};

module.exports = controller;
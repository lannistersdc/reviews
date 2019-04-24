const Review = require('../database/index.js');

const controller = {
  get: (req, res) => {
    const _id = req.params._id;
    Review.find({
        restaurantID: _id
      })
      .sort({
        date: -1
      })
      .then(docs => res.status(200).send(docs))
      .catch(err => console.error(err));
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
          .then((data) => {
            res.status(201).send(data);
          })
          .catch(err => console.error(err))
      })
    // .create(req.body)
    // .then((data) => res.status(201).send(data))
    // .catch((err) => console.error(err))
  },
  put: (req, res) => {
    res.send('your mother')
  },
  delete: (req, res) => {
    res.send('yo mama')
  }
};

module.exports = controller;
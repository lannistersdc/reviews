const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://adam:killme@3.16.129.244/review', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error(err));

const reviewSchema = mongoose.Schema({
  id: {type: Number, index: true},
  restaurantID: {type: Number, index: true},
  username: String,
  location: String,
  vip: Boolean,
  totalReviews: Number,
  overall: Number,
  food: Number,
  service: Number,
  ambience: Number,
  value: Number,
  recommend: Boolean,
  //date references when the review was created
  date: Date,
  text: String
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/review', { useMongoClient: true })
  .then(() => console.log('Connected to mongoDB'));

const reviewSchema = mongoose.Schema({
  restaurantID: Number,
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
  date: Date,
  text: String
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

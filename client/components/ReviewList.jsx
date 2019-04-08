import React from 'react';
import axios from 'axios';
import styles from './ReviewList.module.scss';

import ReviewListEntry from './ReviewListEntry.jsx';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewCount: 0,
      overallAvg: 0,
      oneStar: 0,
      twoStar: 0,
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
      foodAvg: 0,
      serviceAvg: 0,
      ambienceAvg: 0,
      valueAvg: 0,
      recommendAvg: 0,
      reviews: []
    };
    this.getRestaurantReviews = this.getRestaurantReviews.bind(this);
  }

  componentDidMount() {
    this.getRestaurantReviews(2);
  }

  getRestaurantReviews(restaurantID) {
    axios
      .get(`/api/restaurants/${restaurantID}`)
      .then(response => {
        this.setState({
          reviews: response.data
        });
      })
      .then(() => {
        let reviewCount = this.state.reviews.length;
        let overallAvg = 0;
        let oneStar = 0;
        let twoStar = 0;
        let threeStar = 0;
        let fourStar = 0;
        let fiveStar = 0;
        let foodAvg = 0;
        let serviceAvg = 0;
        let ambienceAvg = 0;
        let valueAvg = 0;
        let recommendAvg = 0;
        for (let i = 0; i < this.state.reviews.length; i++) {
          overallAvg += this.state.reviews[i].overall;
          switch (this.state.reviews[i].overall) {
            case 1:
              oneStar++;
              break;
            case 2:
              twoStar++;
              break;
            case 3:
              threeStar++;
              break;
            case 4:
              fourStar++;
              break;
            case 5:
              fiveStar++;
              break;
          }
          foodAvg += this.state.reviews[i].food;
          serviceAvg += this.state.reviews[i].service;
          ambienceAvg += this.state.reviews[i].ambience;
          valueAvg += this.state.reviews[i].value;
          if (this.state.reviews[i].recommend) {
            recommendAvg++;
          }
        }
        overallAvg = (overallAvg / this.state.reviews.length).toFixed(1);
        foodAvg = (foodAvg / this.state.reviews.length).toFixed(1);
        serviceAvg = (serviceAvg / this.state.reviews.length).toFixed(1);
        ambienceAvg = (ambienceAvg / this.state.reviews.length).toFixed(1);
        valueAvg = (valueAvg / this.state.reviews.length).toFixed(1);
        recommendAvg = Math.round(
          100 * (recommendAvg / this.state.reviews.length)
        );
        this.setState({
          reviewCount,
          overallAvg,
          oneStar,
          twoStar,
          threeStar,
          fourStar,
          fiveStar,
          foodAvg,
          serviceAvg,
          ambienceAvg,
          valueAvg,
          recommendAvg
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className={styles.reviewListContainer}>
        <div className={styles.peopleSaying}>
          What {this.state.reviewCount} People Are Saying
        </div>
        <div className={styles.reviewOverview}>
          <div>
            <div className={styles.overallInfo}>
              Overall ratings and reviews
            </div>
            <div>
              Reviews can only be made by diners who have eaten at this
              restaurant
            </div>
            <table>
              <tr>{this.state.overallAvg} based on recent ratings</tr>
              <tr>
                {this.state.foodAvg} Food {this.state.serviceAvg} Service{' '}
                {this.state.ambienceAvg} Ambience {this.state.valueAvg} Value
              </tr>
              <tr>
                {this.state.recommendAvg}% of people would recommend it to a
                friend
              </tr>
            </table>
          </div>
          <div>
            1 {this.state.oneStar} 2 {this.state.twoStar} 3{' '}
            {this.state.threeStar} 4 {this.state.fourStar} 5{' '}
            {this.state.fiveStar}
          </div>
        </div>
        <table />
        <table>
          {this.state.reviews.map((review, index) => (
            <ReviewListEntry key={index} review={review} />
          ))}
        </table>
      </div>
    );
  }
}

import React from 'react';
import ReactPaginate from 'react-paginate';
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
      reviews: [],
      pageCount: 1
    };
    this.getRestaurantReviews = this.getRestaurantReviews.bind(this);
  }

  componentDidMount() {
    this.getRestaurantReviews(5);
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
        let reviews = this.state.reviews;
        let reviewCount = reviews.length;
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
        let pageCount = Math.ceil(reviewCount / 40);
        for (let i = 0; i < reviews.length; i++) {
          overallAvg += reviews[i].overall;
          switch (reviews[i].overall) {
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
          foodAvg += reviews[i].food;
          serviceAvg += reviews[i].service;
          ambienceAvg += reviews[i].ambience;
          valueAvg += reviews[i].value;
          if (reviews[i].recommend) {
            recommendAvg++;
          }
        }
        oneStar = 100 * (oneStar / reviewCount);
        twoStar = 100 * (twoStar / reviewCount);
        threeStar = 100 * (threeStar / reviewCount);
        fourStar = 100 * (fourStar / reviewCount);
        fiveStar = 100 * (fiveStar / reviewCount);
        overallAvg = (overallAvg / reviewCount).toFixed(1);
        foodAvg = (foodAvg / reviewCount).toFixed(1);
        serviceAvg = (serviceAvg / reviewCount).toFixed(1);
        ambienceAvg = (ambienceAvg / reviewCount).toFixed(1);
        valueAvg = (valueAvg / reviewCount).toFixed(1);
        recommendAvg = Math.round(100 * (recommendAvg / reviewCount));
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
          recommendAvg,
          pageCount
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
          <div className={styles.overviewContainer}>
            <div className={styles.overallInfo}>
              Overall ratings and reviews
            </div>
            <div className={styles.reviewDisclaimer}>
              Reviews can only be made by diners who have eaten at this
              restaurant
            </div>
            <div className={styles.reviewRecent}>
              {this.state.overallAvg} based on recent ratings
            </div>
            <table className={styles.reviewTable}>
              <tr>
                <td>
                  {this.state.foodAvg}
                  <br />
                  <a>Food</a>
                </td>
                <td>
                  {this.state.serviceAvg}
                  <br />
                  <a>Service</a>
                </td>
                <td>
                  {this.state.ambienceAvg}
                  <br />
                  <a>Ambience</a>
                </td>
                <td>
                  {this.state.valueAvg}
                  <br />
                  <a>Value</a>
                </td>
              </tr>
            </table>
            <div className={styles.noiseLevel}>
              <img src="./icons/noiseMeter.png" height="16px" width="auto" />{' '}
              <a>Noise</a>{' '}
              <img src="./icons/blackDot.png" height="2px" width="auto" />{' '}
              moderate
            </div>
            <div className={styles.recommend}>
              <img src="./icons/thumbsUp.png" height="18px" width="auto" />{' '}
              <a>{this.state.recommendAvg}% of people</a> would recommend it to
              a friend
            </div>
          </div>
          <div className={styles.reviewGraph}>
            <div className={styles.reviewLine}>
              <div className={styles.reviewStars}>5</div>
              <div className={styles.reviewBar}>
                <div
                  className={styles.reviewFill}
                  style={{
                    width: `${this.state.fiveStar}%`
                  }}
                />
              </div>
            </div>
            <div className={styles.reviewLine}>
              <div className={styles.reviewStars}>4</div>
              <div className={styles.reviewBar}>
                <div
                  className={styles.reviewFill}
                  style={{
                    width: `${this.state.fourStar}%`
                  }}
                />
              </div>
            </div>
            <div className={styles.reviewLine}>
              <div className={styles.reviewStars}>3</div>
              <div className={styles.reviewBar}>
                <div
                  className={styles.reviewFill}
                  style={{
                    width: `${this.state.threeStar}%`
                  }}
                />
              </div>
            </div>
            <div className={styles.reviewLine}>
              <div className={styles.reviewStars}>2</div>
              <div className={styles.reviewBar}>
                <div
                  className={styles.reviewFill}
                  style={{
                    width: `${this.state.twoStar}%`
                  }}
                />
              </div>
            </div>
            <div className={styles.reviewLine}>
              <div className={styles.reviewStars}>1</div>
              <div className={styles.reviewBar}>
                <div
                  className={styles.reviewFill}
                  style={{
                    width: `${this.state.oneStar}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <table />
        <div className="reviewList">
          {this.state.reviews.map((review, index) => (
            <ReviewListEntry key={index} review={review} />
          ))}
          <ReactPaginate
            className={styles.paginate}
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={this.handlePageClick}
            initialPage={1}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    );
  }
}

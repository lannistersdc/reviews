import React from "react";
import axios from "axios";
import styles from "./ReviewList.module.scss";

import ReviewListEntry from "./ReviewListEntry.jsx";
import ReviewPaginate from "./ReviewPaginate.jsx";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
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
      someReviews: [],
      pageCount: 1,
      currentPage: 1
    };
    this.getReviewPage = this.getReviewPage.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.sortByNewest = this.sortByNewest.bind(this);
    this.sortByRatingsTop = this.sortByRatingsTop.bind(this);
    this.sortByRatingsBottom = this.sortByRatingsBottom.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/restaurant/${Math.floor(Math.random() * 1e7) + 1}`)
      .then(response => {
        //TODO: Sort by id decrementing
        this.setState({
          allReviews: response.data
        });
      })
      .then(() => {
        let allReviews = this.state.allReviews;
        let reviewCount = allReviews.length;
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
        let pageCount = Math.ceil(reviewCount / 10);
        for (let i = 0; i < allReviews.length; i++) {
          overallAvg += allReviews[i].overall;
          switch (allReviews[i].overall) {
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
          foodAvg += allReviews[i].food;
          serviceAvg += allReviews[i].service;
          ambienceAvg += allReviews[i].ambience;
          valueAvg += allReviews[i].value;
          if (allReviews[i].recommend) {
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
        this.getReviewPage(1);
      })
      .catch(err => console.error(err));
  }

  getReviewPage(currentPage) {
    let someReviews = [];
    let maxIndex = currentPage * 10;
    let minIndex = maxIndex - 10;
    for (let i = minIndex; i < maxIndex; i++) {
      if (!this.state.allReviews[i]) {
        break;
      }
      someReviews.push(this.state.allReviews[i]);
    }
    this.setState({
      someReviews,
      currentPage
    });
  }

  handleSort(event) {
    let sort = event.target.value;
    console.log(sort);
    switch (parseInt(sort)) {
      case 1:
        console.log("new");
        this.sortByNewest();
        break;
      case 2:
        console.log("top");
        this.sortByRatingsTop();
        break;
      case 3:
        console.log("bot");
        this.sortByRatingsBottom();
        break;
    }
  }

  sortByNewest() {
    let allReviews = this.state.allReviews;
    console.log(allReviews);
    allReviews = allReviews.sort((a, b) =>
      a.date < b.date ? 1 : b.date < a.date ? -1 : 0
    );
    this.setState({
      allReviews
    });
    this.getReviewPage(1);
  }

  sortByRatingsTop() {
    let allReviews = this.state.allReviews;
    allReviews = allReviews.sort((a, b) =>
      a.overall < b.overall ? 1 : b.overall < a.overall ? -1 : 0
    );
    this.setState({
      allReviews
    });
    this.getReviewPage(1);
  }

  sortByRatingsBottom() {
    let allReviews = this.state.allReviews;
    allReviews = allReviews.sort((a, b) =>
      a.overall > b.overall ? 1 : b.overall > a.overall ? -1 : 0
    );
    this.setState({
      allReviews
    });
    this.getReviewPage(1);
  }

  render() {
    return (
      <div id="jeffs-reviews" className={styles.reviewListContainer}>
        <div className={styles.peopleSaying}>What Insiders Are Saying</div>
        <div id="jeffs-insiders" className={styles.insiderContainer}>
          <div className={styles.infatuation}>
            <img
              src="https://s3-us-west-1.amazonaws.com/review-icons/bullHorn.png"
              height="50px"
              width="auto"
            />
            <div className={styles.infatuationTitleAndScore}>
              <div className={styles.infatuationTitle}>The Infatuation</div>
              <div className={styles.infatuationScore}>9.1/10</div>
            </div>
          </div>
          <div className={styles.insiderBody}>
            Looking for food? Look no further! This is a place that will serve
            food to you on a plate for a complete dining experience.
          </div>
          <div className={styles.insiderDisclaimer}>
            Ratings 9.0-9.8: If the 8.5-9.0s are the restaurants you’ll frequent
            for more than just special occasions, the 9.0-9.8s are the all time
            great restaurants of their city. Restaurants that will be around 20
            years from now, assuming the Earth is still around.
          </div>
          <button className={styles.insiderButton}>Read the full review</button>
        </div>
        <div className={styles.peopleSaying} id="review-list">
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
              <img
                src="https://s3-us-west-1.amazonaws.com/review-icons/noiseMeter.png"
                height="16px"
                width="auto"
              />{" "}
              <a>Noise</a>{" "}
              <img
                src="https://s3-us-west-1.amazonaws.com/review-icons/blackDot.png"
                height="2px"
                width="auto"
              />{" "}
              moderate
            </div>
            <div className={styles.recommend}>
              <img
                src="https://s3-us-west-1.amazonaws.com/review-icons/thumbsUp.png"
                height="18px"
                width="auto"
              />{" "}
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
        <div className={styles.lovedFor}>
          Loved For{" "}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/infoIcon.png"
            height="20px"
            width="auto"
          />
        </div>
        <div className={styles.awardsContainer}>
          <div className={styles.award}>
            <img
              src="https://s3-us-west-1.amazonaws.com/review-icons/awardTrophy.png"
              height="18px"
              width="auto"
            />
            <div className={styles.awardNameAndLocation}>
              <div className={styles.awardName}>Best Restrooms</div>
              <div className={styles.awardLocation}>Los Angeles</div>
            </div>
          </div>
          <div className={styles.award}>
            <img
              src="https://s3-us-west-1.amazonaws.com/review-icons/awardTrophy.png"
              height="18px"
              width="auto"
            />
            <div className={styles.awardNameAndLocation}>
              <div className={styles.awardName}>Most Heart Attacks</div>
              <div className={styles.awardLocation}>
                Downtown / South and East LA
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sortBy}>Sort By</div>
        <select className={styles.sorter} onChange={this.handleSort}>
          <option value="1">Newest</option>
          <option value="2">Highest Rating</option>
          <option value="3">Lowest Rating</option>
        </select>
        <div className="reviewList">
          {this.state.someReviews.map((review, index) => (
            <ReviewListEntry key={index} review={review} />
          ))}
        </div>
        <div className="paginate">
          <ReviewPaginate
            getReviewPage={this.getReviewPage}
            pageCount={this.state.pageCount}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

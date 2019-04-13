import React from 'react';
import moment from 'moment';
import styles from './ReviewListEntry.module.scss';

const ReviewListEntry = props => {
  const { review } = props;
  review.date = moment(review.date).format('LL');
  let shortName = '';
  for (let i = 0; i < review.username.length; i++) {
    if (review.username[i] == review.username[i].toUpperCase()) {
      shortName += review.username[i];
      if (shortName.length >= 2) {
        break;
      }
    }
  }
  let colorCode = (shortName.charCodeAt(0) + shortName.charCodeAt(1)) % 4;
  let color;
  switch (colorCode) {
    case 0:
      color = <div className={styles.userShortName0}>{shortName}</div>;
      break;
    case 1:
      color = <div className={styles.userShortName1}>{shortName}</div>;
      break;
    case 2:
      color = <div className={styles.userShortName2}>{shortName}</div>;
      break;
    case 3:
      color = <div className={styles.userShortName3}>{shortName}</div>;
      break;
  }
  let stars;
  switch (review.overall) {
    case 1:
      stars = (
        <span>
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />
        </span>
      );
      break;
    case 2:
      stars = (
        <span>
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />
        </span>
      );
      break;
    case 3:
      stars = (
        <span>
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />
        </span>
      );
      break;
    case 4:
      stars = (
        <span>
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/greyStar.png"
            height="16px"
            width="auto"
          />
        </span>
      );
      break;
    case 5:
      stars = (
        <span>
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/redStar.png"
            height="16px"
            width="auto"
          />
        </span>
      );
      break;
  }
  return (
    <div className={styles.reviewEntryContainer}>
      <div className={styles.userInfo}>
        {review.vip && <div className={styles.userVIP}>VIP</div>}
        {color}
        <div className={styles.userLongName}>{review.username}</div>
        <div className={styles.userLocation}>{review.location}</div>
        <div className={styles.userReviews}>
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/speechBubble.png"
            height="12px"
            width="auto"
          />{' '}
          {review.totalReviews} reviews
        </div>
      </div>
      <div className={styles.reviewInfo}>
        <div className={styles.reviewTotal}>
          {stars} Dined on {review.date}
        </div>
        <div className={styles.reviewScores}>
          Overall <span className={styles.scoreNumber}>{review.overall}</span>{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/blackDot.png"
            height="2px"
            width="auto"
          />{' '}
          Food <span className={styles.scoreNumber}>{review.food}</span>{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/blackDot.png"
            height="2px"
            width="auto"
          />{' '}
          Service <span className={styles.scoreNumber}>{review.service}</span>{' '}
          <img
            src="https://s3-us-west-1.amazonaws.com/review-icons/blackDot.png"
            height="2px"
            width="auto"
          />{' '}
          Ambience <span className={styles.scoreNumber}>{review.ambience}</span>
        </div>
        <div className={styles.reviewBody}>{review.text}</div>
        <div className={styles.reviewButtons}>
          <button className={styles.reviewButton}>
            <img
              src="https://s3-us-west-1.amazonaws.com/review-icons/reportFlag.png"
              height="12px"
              width="auto"
            />{' '}
            Report
          </button>
          <button className={styles.reviewButton}>
            <img
              src="https://s3-us-west-1.amazonaws.com/review-icons/helpfulBox.png"
              height="12px"
              width="auto"
            />{' '}
            Helpful
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewListEntry;

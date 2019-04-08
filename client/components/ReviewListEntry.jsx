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
  return (
    <tr className={styles.reviewEntryContainer}>
      <div className={styles.userInfo}>
        {review.vip && <div className={styles.userVIP}>VIP</div>}
        <div className={styles.userShortName}>{shortName}</div>
        <div className={styles.userLongName}>{review.username}</div>
        <div className={styles.userLocation}>{review.location}</div>
        <div className={styles.userReviews}>{review.totalReviews} reviews</div>
      </div>
      <div className={styles.reviewInfo}>
        <div>
          {review.overall} Stars Dined on {review.date}
        </div>
        <div className={styles.reviewScores}>
          Overall <span className={styles.scoreNumber}>{review.overall}</span>
          Food <span className={styles.scoreNumber}>{review.food}</span>
          Service <span className={styles.scoreNumber}>{review.service}</span>
          Ambience <span className={styles.scoreNumber}>{review.ambience}</span>
        </div>
        <div className={styles.reviewBody}>{review.text}</div>
        <div className={styles.reviewButtons}>
          <button className={styles.reviewButton}>Report</button>
          <button className={styles.reviewButton}>Helpful</button>
        </div>
      </div>
    </tr>
  );
};

export default ReviewListEntry;

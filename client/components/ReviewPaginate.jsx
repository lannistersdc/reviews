import React from 'react';
import styles from './ReviewPaginate.module.scss';

const ReviewPaginate = props => {
  const { getReviewPage, pageCount, currentPage } = props;

  let handlePageClick = newPage => {
    if (1 <= newPage && newPage <= pageCount) {
      getReviewPage(newPage);
    }
  };

  let pages = [1];
  if (currentPage <= 2) {
    for (let i = 2; i <= 3; i++) {
      if (i >= pageCount) {
        break;
      }
      pages.push(i);
    }
    if (pageCount > 1) {
      pages.push(pageCount);
    }
  } else if (currentPage >= pageCount - 1) {
    for (let i = pageCount - 2; i <= pageCount; i++) {
      if (i > 1) {
        pages.push(i);
      }
    }
  } else {
    for (let i = -1; i <= 1; i++) {
      pages.push(currentPage + i);
    }
    pages.push(pageCount);
  }
  let pagination = [];
  for (let i = 0; i < pages.length; i++) {
    if (i > 0 && pages[i] - pages[i - 1] > 1) {
      pagination.push(<span>...</span>);
    }
    pagination.push(
      <button
        type="button"
        className={styles.pageButton}
        onClick={() => handlePageClick(pages[i])}
      >
        {pages[i]}
      </button>
    );
  }

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.prevButton}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        {'<'}
      </button>
      <span className={styles.pages}>{pagination}</span>
      <button
        className={styles.nextButton}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  );
};

export default ReviewPaginate;

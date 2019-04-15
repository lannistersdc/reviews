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
      pagination.push(<span className={styles.ellipsis}>...</span>);
    }
    if (pages[i] === currentPage) {
      pagination.push(
        <button
          type="button"
          className={styles.currentPageButton}
          onClick={() => handlePageClick(pages[i])}
        >
          {pages[i]}
        </button>
      );
    } else {
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
  }
  let prevButton;
  if (currentPage > 1) {
    prevButton = (
      <button
        className={styles.prevButton}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        {'<'}
      </button>
    );
  } else {
    prevButton = (
      <button
        className={styles.inactivePrevButton}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        {'<'}
      </button>
    );
  }
  let nextButton;
  if (currentPage < pageCount) {
    nextButton = (
      <button
        className={styles.nextButton}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        {'>'}
      </button>
    );
  } else {
    nextButton = (
      <button
        className={styles.inactiveNextButton}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        {'>'}
      </button>
    );
  }

  return (
    <div className={styles.paginationContainer}>
      {prevButton}
      <div className={styles.pages}>{pagination}</div>
      {nextButton}
    </div>
  );
};

export default ReviewPaginate;

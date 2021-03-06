import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import classnames from 'classnames';
import './styles.scss';

interface Props {
  dataCount: number;
  rowsPerPage: number;
  currentPage: number;
  siblingCount?: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  className: string;
}

function Pagination({ dataCount, rowsPerPage, currentPage, siblingCount = 2, onPageChange, className }: Props) {
  const paginationRange = usePagination({
    currentPage,
    dataCount,
    siblingCount,
    rowsPerPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onDoubleNext = () => {
    if (currentPage >= Math.ceil(dataCount / rowsPerPage) - 10) {
      onPageChange(Math.ceil(dataCount / rowsPerPage));
    } else {
      onPageChange(currentPage + 10);
    }
  };

  const onPrev = () => {
    onPageChange(currentPage - 1);
  };

  const onDoublePrev = () => {
    if (currentPage <= 10) {
      onPageChange(1);
    } else {
      onPageChange(currentPage - 10);
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classnames('pagination-container', { [className]: className })}>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onDoublePrev}
      >
        <div className="arrow left" />
        <div className="arrow left" />
      </li>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrev}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNum, index) => {
        if (pageNum === DOTS) {
          return (
            <li key={index} className="pagination-item dots">
              &#8230;
            </li>
          );
        } else {
          return (
            <li
              key={index}
              className={classnames('pagination-item', {
                selected: pageNum === currentPage,
              })}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </li>
          );
        }
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onDoubleNext}
      >
        <div className="arrow right" />
        <div className="arrow right" />
      </li>
    </ul>
  );
}

export default Pagination;

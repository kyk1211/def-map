import React from 'react';
import { useMemo } from 'react';

interface Props {
  dataCount: number;
  rowsPerPage: number;
  currentPage: number;
  siblingCount: number;
}

const range = (start: number, end: number, step: number = 1) => {
  let length = (end - start) / step + 1;
  return Array.from({ length }, (_, idx) => start + idx * step);
};
export const DOTS = '...';

export const usePagination = ({
  dataCount,
  rowsPerPage,
  currentPage,
  siblingCount: siblingCount = 1,
}: Props) => {
  const paginationRange: (typeof DOTS | number)[] = useMemo(() => {
    const totalPageCount = Math.ceil(dataCount / rowsPerPage);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIdx = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIdx = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIdx > 2;
    const shouldShowRightDots = rightSiblingIdx < totalPageCount - 2;

    const firstPageIdx = 1;
    const lastPageIdx = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIdx, DOTS, ...rightRange];
    } else {
      let middleRange = range(leftSiblingIdx, rightSiblingIdx);
      return [firstPageIdx, DOTS, ...middleRange, DOTS, lastPageIdx];
    }
  }, [dataCount, rowsPerPage, siblingCount, currentPage]);
  return paginationRange;
};

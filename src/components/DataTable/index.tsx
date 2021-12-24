import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { defData } from '../../types/types';
import sorter from '../../utils/sorter';
import Pagination from '../Pagination';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './styles.scss';

interface Props {
  data: defData[];
  search: string;
}

function DataTable({ data, search }: Props) {
  const rowsPerPage = 10;
  const [tableData, setTableData] = useState([...data]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof defData | ''>('');
  const [reverse, setReverse] = useState(false);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * rowsPerPage;
    const lastPageIndex = firstPageIndex + rowsPerPage;
    return tableData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tableData]);

  useEffect(() => {
    setTableData([...data]);
    setCurrentPage(1);
    setReverse(false);
  }, [data]);

  useEffect(() => {
    setSortKey('');
    setReverse(false);
  }, [search]);

  useEffect(() => {
    setReverse(false);
  }, [sortKey]);

  useEffect(() => {
    setCurrentPage(1);
    if (sortKey) {
      const target = [...tableData];
      sorter<defData>(target, sortKey, reverse);
      setTableData(target);
    }
  }, [sortKey, reverse]);

  return (
    <div className="data-table">
      <span>요소수 재고 정보</span>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="name">이름</th>
              <th className="addr">주소</th>
              <th className="time">운영시간</th>
              <th
                className={classNames('inven', 'cc', {
                  selected: sortKey === 'inventory',
                  reversed: sortKey === 'inventory' && reverse,
                })}
                onClick={() => {
                  setSortKey('inventory');
                  setReverse((prev) => !prev);
                }}
              >
                재고량(L)
                {sortKey === 'inventory' && reverse ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  sortKey === 'inventory' && (
                    <ArrowDownwardIcon fontSize="small" />
                  )
                )}
              </th>
              <th
                className={classNames('price', 'cc', {
                  selected: sortKey === 'price',
                  reversed: sortKey === 'price' && reverse,
                })}
                onClick={() => {
                  setSortKey('price');
                  setReverse((prev) => !prev);
                }}
              >
                가격
                {sortKey === 'price' && reverse ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  sortKey === 'price' && <ArrowDownwardIcon fontSize="small" />
                )}
              </th>
              <th className="tel">전화번호</th>
              <th
                className={classNames('date', 'cc', {
                  selected: sortKey === 'regDt',
                  reversed: sortKey === 'regDt' && reverse,
                })}
                onClick={() => {
                  setSortKey('regDt');
                  setReverse((prev) => !prev);
                }}
              >
                수정일자
                {sortKey === 'regDt' && reverse ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  sortKey === 'regDt' && <ArrowDownwardIcon fontSize="small" />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((item) => (
              <tr key={item.code}>
                <th>{item.name || '정보없음'}</th>
                <td>{item.addr || '정보없음'}</td>
                <td>{item.openTime || '정보없음'}</td>
                <td>{item.inventory || '정보없음'}</td>
                <td>
                  {item.price === 'undefined'
                    ? '정보없음'
                    : item.price || '정보없음'}
                </td>
                <td>{item.tel || '정보없음'}</td>
                <td>{item.regDt || '정보없음'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        className="pagination-bar"
        dataCount={tableData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default DataTable;

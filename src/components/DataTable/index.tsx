import React, { useEffect, useState } from 'react';
import { defData } from '../../types/types';
import sorter from '../../utils/sorter';
import './styles.css';

interface Props {
  data: defData[];
  setDefData: React.Dispatch<React.SetStateAction<defData[]>>;
  setSearchedData: React.Dispatch<React.SetStateAction<defData[]>>;
  search: string;
}

function DataTable({ data, setDefData, setSearchedData, search }: Props) {
  const rowsPerPage = 10;
  const [sortKey, setSortKey] = useState<keyof defData | ''>('');
  const [pageNum, setPageNum] = useState(1);
  const [pageIdx, setPageIdx] = useState<number>(0);
  const [page, setPage] = useState<number[][]>([]);
  const dataCount = data.length;

  const handleLeftClick = () => {
    if (pageNum === 1) return;
    if (pageNum % 10 === 1) {
      setPageIdx((prev) => prev - 1);
    }
    setPageNum((prev) => prev - 1);
  };

  const handleRightClick = () => {
    if (pageNum === Math.ceil(dataCount / rowsPerPage)) return;
    if (page[pageIdx][-1] === pageNum) {
      setPageIdx((prev) => prev + 1);
    }
    setPageNum((prev) => prev + 1);
  };

  useEffect(() => {
    let arr = [];
    let sarr = [];
    for (let i = 1; i <= Math.ceil(dataCount / rowsPerPage); i++) {
      arr.push(i);
      if (arr.length === 10) {
        sarr.push(arr);
        arr = [];
      } else if (i === Math.ceil(dataCount / rowsPerPage)) {
        sarr.push(arr);
      }
    }
    setPage(sarr);
    console.log(`총 데이터: ${dataCount}건`);
    console.log(sarr);
  }, [rowsPerPage, dataCount]);

  useEffect(() => {
    setPageNum(1);
    if (sortKey) {
      const target = [...data];
      sorter<defData>(target, sortKey);
      if (search) {
        setSearchedData(target);
      } else {
        setDefData(target);
      }
    }
  }, [sortKey, search]);

  return (
    <div className="table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>주소</th>
              <th>운영시간</th>
              <th onClick={() => setSortKey('inventory')}>재고량(리터)</th>
              <th onClick={() => setSortKey('price')}>가격(리터당)</th>
              <th>전화번호</th>
              <th onClick={() => setSortKey('regDt')}>수정일자</th>
            </tr>
          </thead>
          <tbody>
            {data.slice((pageNum - 1) * rowsPerPage, (pageNum - 1) * rowsPerPage + rowsPerPage).map((item) => (
              <tr key={item.code}>
                <td>{item.name || '정보없음'}</td>
                <td>{item.addr || '정보없음'}</td>
                <td>{item.openTime || '정보없음'}</td>
                <td>{item.inventory || '정보없음'}</td>
                <td>{item.price || '정보없음'}</td>
                <td>{item.tel || '정보없음'}</td>
                <td>{item.regDt || '정보없음'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul
        className="pagination"
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'row',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <li>
          <button>&lt;&lt;</button>
        </li>
        <li>
          <button onClick={() => handleLeftClick()}>&lt;</button>
        </li>
        {page[pageIdx]?.map((item, idx) => (
          <li key={idx}>
            <button value={item} onClick={() => setPageNum(item)}>
              {item}
            </button>
          </li>
        ))}
        <li>
          <button onClick={() => handleRightClick()}>&gt;</button>
        </li>
        <li>
          <button>&gt;&gt;</button>
        </li>
      </ul>
    </div>
  );
}

export default DataTable;

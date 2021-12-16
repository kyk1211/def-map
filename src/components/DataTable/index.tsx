import React, { useCallback, useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState<{ [key: number]: number[] }>({});
  const dataCount = data.length;

  useEffect(() => {
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
            {data
              .slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage
              )
              .map((item) => (
                <tr key={item.code}>
                  <td>{item.name || '정보없음'}</td>
                  <td>{item.addr || '정보없음'}</td>
                  <td align="center">{item.openTime || '정보없음'}</td>
                  <td>{item.inventory || '정보없음'}</td>
                  <td>{item.price || '정보없음'}</td>
                  <td>{item.tel || '정보없음'}</td>
                  <td>{item.regDt || '정보없음'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ul className="pagination" style={{ listStyle: 'none' }}>
        {/* {pageNum.map((item) => (
          <li onClick={(e: any) => setPage(Number(e.target.innerText))}>
            {item}
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default DataTable;

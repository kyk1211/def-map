import React, { useEffect, useMemo, useState } from 'react';
import { defData } from '../../types/types';
import sorter from '../../utils/sorter';
import Pagination from '../Pagination';
import './styles.scss';

interface Props {
  data: defData[];
}

function DataTable({ data }: Props) {
  const rowsPerPage = 8;
  const [tableData, setTableData] = useState([...data]);
  const [sortKey, setSortKey] = useState<keyof defData | ''>('');
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * rowsPerPage;
    const lastPageIndex = firstPageIndex + rowsPerPage;
    return tableData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tableData]);

  useEffect(() => {
    setCurrentPage(1);
    if (sortKey) {
      const target = [...tableData];
      sorter<defData>(target, sortKey);
      setTableData(target);
    }
  }, [sortKey]);

  return (
    <div className="table-container">
      <table>
        <caption>요소수 재고 정보</caption>
        <thead>
          <tr>
            <th className="name">이름</th>
            <th className="addr">주소</th>
            <th className="time">운영시간</th>
            <th className="inven" onClick={() => setSortKey('inventory')}>
              재고량(리터)
            </th>
            <th className="price" onClick={() => setSortKey('price')}>
              가격(리터당)
            </th>
            <th className="tel">전화번호</th>
            <th className="date" onClick={() => setSortKey('regDt')}>
              수정일자
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
              <td>{item.price || '정보없음'}</td>
              <td>{item.tel || '정보없음'}</td>
              <td>{item.regDt || '정보없음'}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

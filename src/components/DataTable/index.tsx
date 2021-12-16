import React, { useCallback, useEffect, useState } from 'react';
import { defData } from '../../types/types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Pagination from '@mui/material/Pagination';
import TableRow from '@mui/material/TableRow';
import { Stack } from '@mui/material';
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
  const [page, setPage] = useState(0);
  const handleChangePage = useCallback(
    (e: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    },
    [setPage]
  );
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
    <div>
      <div className="table-container">
        <table>
          <th>이름</th>
          <th>주소</th>
          <th>운영시간</th>
          <th>재고량(리터)</th>
          <th>가격(리터당)</th>
          <th>전화번호</th>
          <th>수정일자</th>
          <TableBody style={{ height: '500px' }}>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.code}>
                  <TableCell>{item.name || '정보없음'}</TableCell>
                  <TableCell>{item.addr || '정보없음'}</TableCell>
                  <TableCell align="center">
                    {item.openTime || '정보없음'}
                  </TableCell>
                  <TableCell>{item.inventory || '정보없음'}</TableCell>
                  <TableCell>{item.price || '정보없음'}</TableCell>
                  <TableCell>{item.tel || '정보없음'}</TableCell>
                  <TableCell>{item.regDt || '정보없음'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </table>
      </div>
      <Stack spacing={1}>
        <Pagination
          count={Math.ceil(dataCount / rowsPerPage) - 1}
          shape="rounded"
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
}

export default DataTable;

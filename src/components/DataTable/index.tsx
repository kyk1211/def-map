import React, { useState } from 'react';
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
import './index.css';

interface Props {
  data: defData[];
  searchedData: defData[];
}

function DataTable({ data, searchedData }: Props) {
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);
  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };
  const dataCount = data.length;

  if (searchedData.length !== 0) {
    const searchedCount = searchedData.length;
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">이름</TableCell>
                <TableCell align="center">주소</TableCell>
                <TableCell align="center">영업시간</TableCell>
                <TableCell align="center">재고량(리터)</TableCell>
                <TableCell align="center">가격(리터당)</TableCell>
                <TableCell align="center">전화번호</TableCell>
                <TableCell align="center">업데이트 일시</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ height: '500px' }}>
              {searchedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.code}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.addr}</TableCell>
                    <TableCell align="center">
                      {item.openTime || '정보없음'}
                    </TableCell>
                    <TableCell>{item.inventory}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.tel}</TableCell>
                    <TableCell>{item.regDt}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={1}>
          <Pagination
            count={Math.floor(searchedCount / rowsPerPage)}
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">주소</TableCell>
              <TableCell align="center">영업시간</TableCell>
              <TableCell align="center">재고량(리터)</TableCell>
              <TableCell align="center">가격(리터당)</TableCell>
              <TableCell align="center">전화번호</TableCell>
              <TableCell align="center">업데이트 일시</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ height: '500px' }}>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.code}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.addr}</TableCell>
                  <TableCell align="center">
                    {item.openTime || '정보없음'}
                  </TableCell>
                  <TableCell>{item.inventory}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.tel}</TableCell>
                  <TableCell>{item.regDt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={1}>
        <Pagination
          count={Math.floor(dataCount / rowsPerPage)}
          shape="rounded"
          onChange={handleChangePage}
        />
      </Stack>
    </Paper>
  );
}

export default DataTable;

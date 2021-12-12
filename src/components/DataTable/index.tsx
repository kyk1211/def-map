import React, { useState } from "react";
import { defData } from "../../types/types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Props {
  data: defData[];
}

function DataTable({ data }: Props) {
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);
  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">주유소 이름</TableCell>
              <TableCell align="center">주소</TableCell>
              <TableCell align="center">재고량</TableCell>
              <TableCell align="center">가격</TableCell>
              <TableCell align="center">전화번호</TableCell>
              <TableCell align="center">업데이트 일시</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.code}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.addr}</TableCell>
                  <TableCell>{item.inventory}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.tel}</TableCell>
                  <TableCell>{item.regDt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DataTable;

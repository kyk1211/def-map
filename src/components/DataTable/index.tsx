import React from "react";
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
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
}

function DataTable({ data, page, setPage, perPage }: Props) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>주유소 이름</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>재고량</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>영업시간</TableCell>
              <TableCell>전화번호</TableCell>
              <TableCell>업데이트 일시</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.addr}</TableCell>
                <TableCell>{item.inventory}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.openTime}</TableCell>
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

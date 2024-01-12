import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  styled,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";

function TransactionHistory({ expenses, searchWord, setSearchWord }) {
  const handleChange = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Container>
        <form style={{ minWidth: 300, marginTop: "40px" }}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            fullWidth
            // onChange={handleChange}
            placeholder="Search by description ..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Container>
      <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Due Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <StyledTableRow
                key={expense.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {expense.description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  ${expense.amount}
                </StyledTableCell>
                <StyledTableCell align="right">{expense.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TransactionHistory;

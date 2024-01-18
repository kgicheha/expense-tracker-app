import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Typography } from "@mui/material/";

function Overview({ expenses }) {
  function filterExpensesForCurrentMonth(exps) {
    const currentMonth = new Date().getMonth() + 1; // Adding 1 since getMonth() returns 0-based month

    return exps.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth() + 1; // Adding 1 since getMonth() returns 0-based month

      return expenseMonth === currentMonth;
    });
  }
  const expensesForCurrentMonth = filterExpensesForCurrentMonth(expenses);

  let currentMonthExpenseTotal = 0;
  expensesForCurrentMonth.forEach(
    (exp) => (currentMonthExpenseTotal += exp.amount)
  );

  // previous months total expense total
  function filterExpensesForPreviousMonth(exps) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns 0-based month
    const currentYear = currentDate.getFullYear();

    // Calculate the previous month and handle the case where it's December of the previous year
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    return exps.filter((expense) => {

      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth() + 1; // Adding 1 since getMonth() returns 0-based month
      const expenseYear = expenseDate.getFullYear();

      return expenseMonth === previousMonth && expenseYear === previousYear;
    });
  }

  const expensesForPreviousMonth = filterExpensesForPreviousMonth(expenses);

  console.log(expensesForPreviousMonth);

  return (
    <>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div">
                  Current Months' Expense: ${currentMonthExpenseTotal}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Overview;

import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Tabs, Tab, Box } from "@mui/material";
import TransactionHistory from "./TransactionHistory";
import TabsContainer from "./TabsContainer";
import Overview from "./Overview";
import NewExpenses from "./NewExpenses";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("one");
  const [searchWord, setSearchWord] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("/expenses");
      console.log(response.data);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      // Handle errors as needed
    }
  };

  //search functionality
  // eslint-disable-next-line
  const SearchTerm = expenses.filter((expense) => {
    if (searchWord === "") return true;
    else if (
      expense.first_name.toLowerCase().includes(searchWord.toLowerCase())
    ) {
      return true;
    }
  });

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <TabsContainer setValue={setValue} value={value} />
        {/* <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            marginBottom: "60px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered
          >
            <Tab value="one" label="Spending Overview" href="/" />
            <Tab value="two" label="Transaction History" href="/history" />
            <Tab value="three" label="Add New Expenses" href="/newexpenses" />
          </Tabs>
        </Box> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Overview expenses={expenses} />}></Route>
            <Route
              path="/history"
              element={
                <TransactionHistory
                  expenses={expenses}
                  setSearchWord={setSearchWord}
                  searchWord={searchWord}
                />
              }
            ></Route>
            <Route path="/newexpenses" element={<NewExpenses />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

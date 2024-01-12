import React, { useState, useEffect } from "react";
import { BrowserRouter} from "react-router-dom";
import { Route, Routes } from "react-router";
import { Tabs, Tab, Box } from "@mui/material";
import TransactionHistory from "./TransactionHistory";
import Overview from "./Overview";
import NewExpenses from "./NewExpenses";
import axios from "axios";

const App = () => {
  const [value, setValue] = React.useState("one");

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

  const addExpense = async () => {
    await axios.post("/expenses", newExpense);
    setNewExpense({ description: "", amount: "", date: "" });
    fetchExpenses();
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered
          >
            <Tab value="one" label="Spending Overview" href="/overview" />
            <Tab value="two" label="Transaction History" href="/history" />
            <Tab value="three" label="Add New Expenses" href="/newexpenses" />
          </Tabs>
        </Box>

        <BrowserRouter>
          <Routes>
            <Route path="/overview" element={<Overview />}></Route>
            <Route path="/history" element={<TransactionHistory />}></Route>
            <Route path="/newexpenses" element={<NewExpenses />}></Route>
          </Routes>
        </BrowserRouter>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.description} - ${expense.amount} - {expense.date}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add Expense</h2>
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({ ...newExpense, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Date"
          value={newExpense.date}
          onChange={(e) =>
            setNewExpense({ ...newExpense, date: e.target.value })
          }
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', date: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/expenses')
      console.log(response.data)
      setExpenses(response.data)

    } catch (error) {
      console.error('Error fetching expenses:', error);
      // Handle errors as needed
    }
  };


  const addExpense = async () => {
    await axios.post('/expenses', newExpense);
    setNewExpense({ description: '', amount: '', date: '' });
    fetchExpenses();
  };


  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <h2>Expenses</h2>
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
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
    </div>
  );
};

export default App;

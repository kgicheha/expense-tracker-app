import React from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Container,
  styled,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

function NewExpenses() {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");

  const [newExpense, setNewExpense] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);

  const handleClick = () => {
    let d = new Date(date).toLocaleDateString("en-US");
    if (!isEdited) {
      setNewExpense([
        ...newExpense,
        {
          val: description + " " + "$" + cost + " " + d,
          isDone: false,
          id: new Date().getTime(),
        },
      ]);
    } else {
      setNewExpense([
        ...newExpense,
        {
          val: description + " " + "$" + cost + " " + d,
          isDone: false,
          id: editedId,
        },
      ]);
    }
    setDescription("");
    setCost("");
    setDate("");
    setIsEdited(false);
  };

  const handlePostExpense = async () => {
    try {
      console.log("I was clicked!")
      // Make a POST request to your backend endpoint
      await axios.post("/expenses", newExpense);

      // Optionally, you can reset the form or update the expenses list
      setNewExpense([]);

      console.log("Expense created successfully!");
    } catch (error) {
      console.error("Error creating expense:", error);
      // Handle errors as needed
    }
  };

  const onDelete = (id) => {
    const newnewExpense = newExpense.filter((exp) => exp.id !== id);
    setNewExpense(newnewExpense);
  };

  const handleEdit = (id) => {
    const newnewExpense = newExpense.filter((exp) => exp.id !== id);
    const editVal = newExpense.find((exp) => exp.id === id);

    let editArray = editVal.val.split(" ");

    let slicedCost = editArray[1].slice(1);

    setEditedId(editVal.id);
    setDescription(editArray[0]);
    setCost(slicedCost);
    setNewExpense(newnewExpense);
    setIsEdited(true);
  };

  const useStyles = styled({
    input: {
      width: "70%",
      marginBottom: 30,
    },
    addButton: {
      height: 55,
      marginBottom: 30,
    },
    container: {
      textAlign: "center",
      marginTop: 100,
    },
    list: {
      width: "80%",
      margin: "auto",
      display: "flex",
      justifyContent: "space-around",
      border: "1px solid light-gray",
    },
    text: {
      width: "70%",
    },
    listButtons: {
      marginLeft: 10,
    },
  });
  const classes = useStyles();
  return (
    <Container component="main" className={classes.container}>
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={classes.input}
        required
      />
      <TextField
        label="Cost"
        variant="outlined"
        fullWidth
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        className={classes.input}
        required
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]} className={classes.input}>
          <DatePicker
            label="Due Date*"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>

      <Button
        size="large"
        variant={isEdited ? "contained" : "contained"}
        color="primary"
        onClick={handleClick}
        className={classes.addButton}
        disabled={description && cost && date ? false : true}
      >
        {isEdited ? "Edit Expense" : "Add Expense"}
      </Button>

      {newExpense.length === 0 ? (
        " "
      ) : (
        <Typography variant="h4" component="h4">
          Monthly Expenses
        </Typography>
      )}

      <List>
        {newExpense.map((exp) => {
          return (
            <>
              <ListItem divider="bool" className={classes.list}>
                <Typography
                  className={classes.text}
                  style={{ color: exp.isDone ? "green" : "" }}
                  key={exp.id}
                >
                  {exp.val}
                </Typography>
                <Button
                  onClick={() => handleEdit(exp.id)}
                  variant="contained"
                  className={classes.listButtons}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(exp.id)}
                  color="secondary"
                  variant="contained"
                  className={classes.listButtons}
                >
                  delete
                </Button>
              </ListItem>
            </>
          );
        })}
      </List>
      {newExpense.length === 0 ? (
        " "
      ) : (
        <Button variant="contained" size="large" onClick={handlePostExpense}>
          SUBMIT
        </Button>
      )}
    </Container>
  );
}

export default NewExpenses;

import React from "react";
import {
  TextField,
  Button,
  Typography,
  Checkbox,
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

  const [inputVal, setInputVal] = useState("");
  const [newExpense, setNewExpense] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      let d = new Date(date).toLocaleDateString("en-US");
      setNewExpense([
        ...newExpense,
        {
          val: description + "   " + "$" + cost + ".00" + "   " + d,
          isDone: false,
          id: new Date().getTime(),
        },
      ]);
    } else {
      setNewExpense([
        ...newExpense,
        { val: inputVal, isDone: false, id: editedId },
      ]);
    }
    setInputVal("");
    setDescription("");
    setCost("");
    setDate("");
    setIsEdited(false);
  };

  const onDelete = (id) => {
    const newnewExpense = newExpense.filter((exp) => exp.id !== id);
    setNewExpense(newnewExpense);
  };

  const handleDone = (id) => {
    const updated = newExpense.map((exp) => {
      if (exp.id === id) {
        exp.isDone = !exp.isDone;
      }
      return exp;
    });
    setNewExpense(updated);
  };

  const handleEdit = (id) => {
    const newnewExpense = newExpense.filter((exp) => exp.id !== id);
    const editVal = newExpense.find((exp) => exp.id === id);
    setEditedId(editVal.id);
    setInputVal(editVal.val);
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
        variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleClick}
        className={classes.addButton}
        disabled={description && cost && date ? false : true}
      >
        {isEdited ? "Edit Task" : "Add Task"}
      </Button>

      {/* getting rid of */}
      <TextField
        variant="outlined"
        onChange={onChange}
        label="type your task"
        value={inputVal}
        className={classes.input}
      />
      <Button
        size="large"
        variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleClick}
        className={classes.addButton}
        disabled={inputVal ? false : true}
      >
        {isEdited ? "Edit Task" : "Add Task"}
      </Button>
      <List>
        {newExpense.map((exp) => {
          return (
            <>
              <ListItem divider="bool" className={classes.list}>
                <Checkbox
                  onClick={() => handleDone(exp.id)}
                  checked={exp.isDone}
                />
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
    </Container>
  );
}

export default NewExpenses;

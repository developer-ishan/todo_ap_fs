import React, { useState } from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Modal,
  makeStyles
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { db } from "./firebase";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function Todo(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.task);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const delTodo = (event) => {
    db.collection("todos").doc(props.todo.id).delete();
  };

  const updateTodo = () => {

    db.collection('todos').doc(props.todo.id).set({
      task: input
    }, {merge: true})//not remove the previous key just update(kinda union)
    setOpen(false)
    setInput('')
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <h1>Update Todo</h1>
          <input value={input} onChange={event => setInput(event.target.value)}/>
          <Button onClick={updateTodo}><SaveIcon /></Button>
          <Button onClick={handleClose}><CancelIcon /></Button>
        </div>
      </Modal>
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText primary={props.todo.task} secondary="Dummy Deadline" />
        <Button onClick={delTodo}>
          <DeleteIcon />
        </Button>
        <Button onClick={handleOpen}>
          <EditIcon  />
        </Button>
      </ListItem>
    </>
  );
}

export default Todo;

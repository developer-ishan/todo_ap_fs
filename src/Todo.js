import React from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "./firebase";

function Todo(props) {
  const delTodo = (event) => {
    db.collection("todos").doc(props.todo.id).delete();
  };
  return (
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText primary={props.todo.task} secondary="Dummy Deadline" />
        <Button onClick={delTodo}>
          <DeleteIcon />
        </Button>
      </ListItem>
  );
}

export default Todo;

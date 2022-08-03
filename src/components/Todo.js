import React from "react";
import firebase from "../utils/firebase";
import "../App.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function Todo({ todo, idx }) {
  const getTodoRef = (todo) => {
    return firebase.database().ref("Todo").child(todo.id);
  };

  const deleteTodo = () => {
    const todoRef = getTodoRef(todo);
    todoRef.remove();
  };

  const completeTodo = () => {
    const todoRef = getTodoRef(todo);
    todoRef.update({
      complete: !todo.complete,
    });
  };

  return (
    <>
      <TableRow key={idx}>
        <TableCell>
          <button className="complete-btn" onClick={completeTodo}>
            <span>Mark</span>
          </button>
          &nbsp;
          <button className="delete-btn" onClick={deleteTodo}>
            <span>Del</span>
          </button>
        </TableCell>
        <TableCell>
          <span className={todo.complete ? "complete" : ""}>{todo.title}</span>
        </TableCell>
        <TableCell>
          {todo.complete ? <i className="bi-check"></i> : <></>}
        </TableCell>
      </TableRow>
    </>
  );
}

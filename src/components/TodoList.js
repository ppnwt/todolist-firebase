import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// component
import { Loading } from "./Loading";

// utils
import firebase from "../utils/firebase";
import { columns } from "../utils/columns";

export default function TodoList() {
  const tableColumnStyle = {
    backgroundColor: "#0065CC",
    color: "#fff",
  };

  const [todoList, setTodoList] = useState();

  useEffect(() => {
    setOpen(true);
    const todoRef = firebase.database().ref("Todo");
    // listen every time data change in todo ref
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setTodoList(todoList);
      setOpen(false);
    });
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Loading open={open} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="my table">
          <TableHead>
            <TableRow>
              {columns.map((label) => (
                <TableCell key={label.id} sx={tableColumnStyle}>
                  {label.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList &&
              todoList.map((todo, idx) => <Todo todo={todo} key={idx} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

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
import firebase from "../utils/_firebase";
import { columns } from "../utils/columns";
import { tableColumnStyle } from "../utils/customCss";

export default function TodoList() {
  const [todoList, setTodoList] = useState();
  const [open, setOpen] = useState(false);

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

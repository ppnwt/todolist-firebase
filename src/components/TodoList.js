import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import Todo from "./Todo";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function TodoList() {
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

  const [open, setOpen] = React.useState(false);

  const columns = [
    {
      accessorKey: "#",
      header: "#",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "complete",
      header: "Complete",
    },
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="my table">
          <TableHead>
            <TableRow>
              {columns.map((label) => (
                <TableCell>{label.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList
              ? todoList.map((todo, idx) => <Todo todo={todo} key={idx} />)
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

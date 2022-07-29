import React from "react";
import firebase from "../utils/firebase";
import "../App.css";

export default function Todo({ todo }) {
  const deleteTodo = () => {
    alert("Are you sure you want to delete ?");
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.remove();
  };

  const completeTodo = () => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.update({
      complete: !todo.complete,
    });
  };

  return (
    <div>
      <h1 className={todo.complete ? "complete" : ""}>
        {todo.complete ? <i class="bi-check"></i> : <></>}
        {todo.title}
      </h1>
      <button className="complete-btn" onClick={completeTodo}>
        {!todo.complete ? "Mark as complete" : "Undo"}
      </button>
      <button className="delete-btn" onClick={deleteTodo}>
        Delete
      </button>
    </div>
  );
}

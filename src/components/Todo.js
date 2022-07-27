import React from "react";
import firebase from "../utils/firebase";
import "../App.css";

export default function Todo({ todo }) {
  const deleteTodo = () => {
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
      <h1 className={todo.complete ? "complete" : ""}>{todo.title}</h1>
      <button className="delete-btn" onClick={deleteTodo}>
        Delete
      </button>
      <button className="complete-btn" onClick={completeTodo}>
        Complete
      </button>
    </div>
  );
}

import React, { useState } from "react";
import firebase from "../utils/firebase";

function Form() {
  const [title, setTitle] = useState();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const createTodo = () => {
    const todoRef = firebase.database().ref("Todo");
    const todo = {
      title,
      complete: false,
    };

    todoRef.push(todo);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} value={title} />
      <button className="add-btn" onClick={createTodo}>
        Add
      </button>
    </div>
  );
}

export default Form;

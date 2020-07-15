import React, { useState, useEffect } from "react";
import "./App.css";
import Item from "./Components/Item";
import Insert from "./Components/Insert";

function App() {
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState();

  useEffect(() => {
    let newTodo = localStorage.getItem("todo");
    setTodo(JSON.parse(newTodo) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const onSubmitText = (title) => {
    if (title.length == 0) {
      return;
    }
    const id = Math.max(...todo.map((t) => t.id), 0) + 1;
    setTodo([...todo, { id, title, done: false }]);
  };

  const toggle = (id) => {
    const newTodo = todo.map((task) => {
      if (task.id == id) {
        task.done = !task.done;
      }
      return task;
    });
    setTodo(newTodo);
  };

  const edit = (id, title) => {
    const newTodo = todo.map((task) => {
      if (task.id == id) {
        task.title = title;
      }
      return task;
    });
    setTodo(newTodo);
  };

  const remove = (id) => {
    setTodo(todo.filter((task) => task.id != id));
  };

  const displayTask = (task) => {
    return (
      <Item
        key={task.id}
        {...task}
        toggle={toggle}
        edit={edit}
        remove={remove}
        setEditMode={setEditMode}
        editMode={editMode === task.id}
      />
    );
  };

  return (
    <div className="App">
      <h1>To do</h1>
      {todo.filter((task) => !task.done).map((task) => displayTask(task))}
      {todo.filter((task) => task.done).map((task) => displayTask(task))}
      <br />
      <Insert
        onSubmit={onSubmitText}
        onFocus={() => {
          setEditMode(null);
        }}
      />
    </div>
  );
}

export default App;

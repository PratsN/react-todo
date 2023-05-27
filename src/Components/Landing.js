import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Landing.css";
const Landing = () => {
  const [todo, setTodo] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTodo, setIsTodo] = useState(false);

  const handleInputText = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTask = () => {
    if (inputText.trim() !== "") {
      setIsTodo(true);
      const newTodo = {
        id: Date.now(),
        text: inputText.charAt(0).toUpperCase() + inputText.slice(1),
        completed: false,
      };

      setTodo([...todo, newTodo]);
      setInputText("");
    }
  };

  const handleRemoveTask = (taskId) => {
    setTodo(todo.filter((task) => task.id !== taskId));
  };

  const handleToggleCompletion = (taskId) => {
    setTodo(
      todo.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1>Todo List App</h1>

      <input
        className="input-text"
        type="text"
        value={inputText}
        onChange={handleInputText}
        placeholder="Enter a Todo"
        autoFocus
      />
      <button className="add-button" onClick={handleAddTask}>
        +
      </button>

      {!isTodo ? (
        <div className="no-todo">
          You have no todos to Display , Please add some
        </div>
      ) : (
        <ul className="todo-list">
          {todo.map((task) => (
            <li
              className="single-todo"
              key={task.id}
              style={{
                color: "black",
                backgroundColor: task.completed ? "#8696FE" : "#FF5D5D",
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompletion(task.id)}
              />

              <span className="todo-text">{task.text}</span>
              <FontAwesomeIcon
                icon={faTrash}
                size="1x"
                color="white"
                onClick={() => handleRemoveTask(task.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Landing;

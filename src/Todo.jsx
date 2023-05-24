import React from "react";
import "./input.css";

const Todo = ({ todo, toggleTodo }) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };
  return (
    <div className = 'b-1 bg-green-400 p-5 mb-2 rounded-xl' >
      <label className="text-lg">
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              onChange={handleTodoClick}
            />
          </label>
          {todo.priority} {todo.name} {todo.date} {todo.assignment}
    </div>
  );
};

export default Todo;

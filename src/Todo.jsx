import React from "react";
import "./input.css";
import ChildTask from "./ChildTask";

const Todo = ({ todo, toggleTodo, toggleChildTodo }) => {

  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };

  return (
    <div className="b-1 bg-green-400 p-5 mb-2 rounded-xl">
      <div>
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
      < ChildTask child={todo.child} toggleChildTodo={toggleChildTodo}/>
    </div>
  );
};

export default Todo;

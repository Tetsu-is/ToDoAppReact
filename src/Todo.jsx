import React from "react";
import "./input.css";
import ChildTask from "./ChildTask";

const Todo = ({ todo, toggleTodo, toggleChildTodo }) => {

  const handleClick = () => {
    alert("clicked");
  }

  return (
    <div className="b-1 bg-green-400 p-5 mb-2 rounded-xl">
      <div>
      <label className="text-lg">
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          onChange={()=>toggleTodo(todo.id)}
        />
      </label>
      {todo.priority} {todo.name} {todo.date} {todo.assignment}
      </div>
      < ChildTask children={todo.children} toggleChildTodo={toggleChildTodo}/>
      <button onClick={handleClick} className="bg-red-500">Add tasks</button>
    </div>
  );
};

export default Todo;

import React from "react";
import "./input.css";
import ChildTask from "./ChildTask";

const Todo = ({ todo, toggleTodo, toggleChildTodo, toggleModal }) => {
  const handleClick = () => {
    toggleModal(todo.id);
  };

  const getColor = (priority) => {
    switch (priority) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      default:
        return "";
    }
  };

  const overDue = (todo) => {
    const today = new Date();
    const due = new Date(todo.date);
    if (today.getTime() > due.getTime()) {
      return "text-red-500";
    } else {
      return "text-black";
    }
  };

  return (
    <div className="b-1 p-5 border-b-2 flex">
      <div className="flex justify-between"></div>
      <label className="text-lg">
        <input
          className="mr-5"
          style={{ transform: "scale(1.5)" }}
          type="checkbox"
          checked={todo.completed}
          readOnly
          onChange={() => toggleTodo(todo.id)}
        />
      </label>
      <div
        className={`w-4 h-4 mt-2 rounded-full ${getColor(todo.priority)} mr-2`}
      ></div>
      {todo.name}
      <div className={`mr-2 ${overDue(todo)}`}>{todo.date}</div>
      {todo.genre} {todo.assignment}
      <ChildTask children={todo.children} toggleChildTodo={toggleChildTodo} />
      <button onClick={handleClick} className="bg-red-500">
        追加 +
      </button>
    </div>
  );
};

export default Todo;

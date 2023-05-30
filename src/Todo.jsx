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
    <div className="p-5 border-b-2">
      <div className="text-lg flex">
        <label className="mr-5">
          <input
            className="mr-1"
            style={{ transform: "scale(1.5)" }}
            type="checkbox"
            checked={todo.completed}
            readOnly
            onChange={() => toggleTodo(todo.id)}
            data-testid="checkbox"
          />
        </label>
        <div
          className={`mt-2 w-4 h-4 rounded-full ${getColor(
            todo.priority
          )} mr-2`}
        ></div>
        <div>{todo.name}</div>
      </div>

      <div className={`ml-10 ${overDue(todo)}`}>{todo.date}</div>
      <div className="text-gray-700 ml-10">{todo.genre}</div>
      <div className="text-gray-700 ml-10">担当：{todo.assignment}</div>
      <div className="childrenBox pl-10">
        <ChildTask children={todo.children} toggleChildTodo={toggleChildTodo} />
        <button onClick={handleClick} className="rounded-md border border-gray-500">
          小タスク追加 +
        </button>
      </div>
    </div>
  );
};

export default Todo;

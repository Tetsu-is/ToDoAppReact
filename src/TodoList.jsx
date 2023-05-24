import React from "react";
import Todo from "./Todo";
import "./input.css";

const TodoList = ({ todos, toggleTodo }) => {
  return (
    <div className='p-10'>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};

export default TodoList;

import React from "react";
import Todo from "./Todo";
import "./input.css";

const TodoList = ({ todos, toggleTodo, toggleChildTodo, toggleModal }) => {
  const list = todos.map((todo) => (
    <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo} toggleChildTodo={toggleChildTodo} toggleModal={toggleModal} />
  ))
  return (
    <div className='p-10'>
      {list}
    </div>
  );
};

export default TodoList;

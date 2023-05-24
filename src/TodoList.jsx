import React from "react";
import Todo from "./Todo";
import "./input.css";

const TodoList = ({ todos, toggleTodo, toggleChildTodo }) => {
  return (
    <div className='p-10'>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo} toggleChildTodo={toggleChildTodo}/>
      ))}
    </div>
  );
};

export default TodoList;

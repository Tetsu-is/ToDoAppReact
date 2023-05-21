import React from "react";
import "./input.css";
import { Accordion } from "@mantine/core";

const Todo = ({ todo, toggleTodo }) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };
  return (
    <div>
      <Accordion variant="separated">
        <Accordion.Item value="customization">
          <Accordion.Control>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              onChange={handleTodoClick}
            />
          </label>
          {todo.name}
          </Accordion.Control>
          <Accordion.Panel>
            <h1>childTask</h1>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Todo;

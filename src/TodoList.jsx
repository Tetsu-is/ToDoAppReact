import React from "react";
import Todo from "./Todo";
import "./input.css";
import { Accordion } from "@mantine/core";

const TodoList = ({ todos, toggleTodo }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Accordion variant="separated" defaultValue="customization">
          <Accordion.Item value="customization">
          <Accordion.Control><Todo todo={todo} key={todo.id} toggleTodo={toggleTodo} /></Accordion.Control>
          </Accordion.Item>
        </Accordion>
      ))}
      {/* <Accordion variant="separated" defaultValue="customization">
        <Accordion.Item value="customization">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit
            your design needs
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion> */}
    </div>
  );
};

export default TodoList;

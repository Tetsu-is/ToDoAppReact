import { fireEvent, render, waitFor } from "@testing-library/react";
import Todo from "./Todo";
import "@testing-library/jest-dom";

describe("Todo", () => {
  const child1 = {
    id: 1,
    name: "c1",
    completed: false,
  };

  const child2 = {
    id: 2,
    name: "c2",
    completed: false,
  };

  const pastTodo = {
    id: 3,
    name: "仕事１",
    completed: false,
    date: "2023-5-1",
    priority: 1,
    genre: "仕事",
    assignment: "Takeshi",
    children: [child1, child2],
  };

  const futureTodo = {
    id: 3,
    name: "仕事１",
    completed: false,
    date: "2023-5-1",
    priority: 1,
    genre: "仕事",
    assignment: "Takeshi",
    children: [child1, child2],
  };

  test("render pastTodo", () => {
    render(<Todo todo={pastTodo} />);
  });

  test("render futureTodo", () => {
    render(<Todo todo={futureTodo} />);
  });

  test("checkBox in todo", async () => {
    const toggleTodo = jest.fn((id) => {
      if (id === pastTodo.id) {
        pastTodo.completed = !pastTodo.completed;
      }
    });
    const { getByTestId } = render(
      <Todo todo={pastTodo} toggleTodo={toggleTodo} />
    );
    fireEvent.click(getByTestId("checkbox"));
    expect(toggleTodo).toHaveBeenCalledWith(pastTodo.id);
    expect(pastTodo.completed).toBe(true);
  });
});

import { render, fireEvent } from "@testing-library/react";
import ChildTask from "./ChildTask";

describe("ChildTask", () => {
  test("render childTasks", () => {
    const child1 = {
      id: 1,
      name: "c1",
      completed: false,
    };
    const children = [child1];
    const toggleChildTodo = jest.fn((id) => {
      if (id === child1.id) {
        child1.completed = !child1.completed;
      }
    });
    const { getByTestId } = render(<ChildTask children={children} toggleChildTodo={toggleChildTodo}/>);
    fireEvent.click(getByTestId("child-check-box"));
    expect(child1.completed).toBe(true);
  });
});

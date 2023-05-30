import { render} from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList", () => {
  test("render TodoList", async () => {
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

    const testTodos = [
      {
        id: 3,
        name: "仕事１",
        completed: false,
        date: "2023-5-1",
        priority: 1,
        genre: "仕事",
        assignment: "Takeshi",
        children: [child1, child2],
      },
      {
        id: 4,
        name: "仕事2",
        completed: false,
        date: "2023-6-1",
        priority: 2,
        genre: "仕事",
        assignment: "Takeshi",
        children: [child1, child2],
      },
    ];
    render(<TodoList todos={testTodos} />);
  });
});

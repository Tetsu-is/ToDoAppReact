import { render } from "@testing-library/react";
import ChildTask from "./ChildTask";

describe("ChildTask", () => {
  test("render childTasks", () => {
    const children = [
      {
        id: 1,
        name: "c1",
        completed: false,
      },
      {
        id: 2,
        name: "c1",
        completed: false,
      },
    ];
    render(<ChildTask children={children} />);
  });
});

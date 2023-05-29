import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe("App", () => {

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const defaultDate = `${year}-${month}-${day}`;

  test("render App", async () => {
    render(<App />);
  });


  test("input taskName", async () => {
    render(<App />);

    const taskName = "task1"

    const inputName = screen.getByPlaceholderText(/タスクの名前/i);
    fireEvent.change(inputName, { target: { value: taskName } });
  })


  test("input taskName", async () => {
    const { getByPlaceholderText } = render(<App />);

    const taskName = "task1"

    const inputName = screen.getByPlaceholderText(/タスクの名前/i);
    fireEvent.change(inputName, { target: { value: taskName } });
  })


  test("select pastDate", async () => {
    const { getByPlaceholderText } = render(<App/>);
    const pastDate = "2023-05-01"
    fireEvent.change(getByPlaceholderText("タスクの期日"), { target: { value: pastDate}})
  })


  test("select today", async () => {
    const { getByPlaceholderText } = render(<App/>);
    const today = defaultDate;
    fireEvent.change(getByPlaceholderText("タスクの期日"), { target: { value: today}})
  })


  test("select futureDate", async () => {
    const { getByPlaceholderText } = render(<App/>);
    const futureDate = "2023-07-01"
    fireEvent.change(getByPlaceholderText("タスクの期日"), { target: { value: futureDate}})
  })


  test("select priority", async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    fireEvent.change(getByTestId('select-priority'), { target: { value: 1 } })
    let options = getAllByTestId('select-priority-option')
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
  })


  test("select genre", async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    fireEvent.change(getByTestId('select-genre'), { target: { value: "仕事" } })
    let options = getAllByTestId('select-priority-option')
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
  })


  test("select assignment", async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    fireEvent.change(getByTestId('select-assignment'), { target: { value: "member1" } })
    let options = getAllByTestId('select-assignment-option')
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
  })


  test("click add task button", async () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('adding-task-button'));
  })


  test("click delete task button", async () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('adding-delete-button'));
  })


  test("adds a new task with taskName", async () => {
    render(<App />);

    const taskName = "New Task";

    const inputName = screen.getByPlaceholderText(/タスクの名前/i);
    fireEvent.change(inputName, { target: { value: taskName } });

    const addButton = screen.getByText(/追加 +/i);
    fireEvent.click(addButton);

    const nameElement = await screen.findByText(/New Task/i);
    expect(nameElement).toBeInTheDocument();
    const defaultDateElement = await screen.findByText(defaultDate);
    expect(defaultDateElement).toBeInTheDocument();
  });
});

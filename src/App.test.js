import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import nock from 'nock';



describe("App", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    const { getByPlaceholderText } = render(<App />);
    const pastDate = "2023-05-01"
    fireEvent.change(getByPlaceholderText("タスクの期日"), { target: { value: pastDate } })
  })


  test("select today", async () => {
    const { getByPlaceholderText } = render(<App />);
    const today = defaultDate;
    fireEvent.change(getByPlaceholderText("タスクの期日"), { target: { value: today } })
  })


  test("select futureDate", async () => {
    const { getByPlaceholderText } = render(<App />);
    const futureDate = "2023-07-01"
    fireEvent.change(getByPlaceholderText("タスクの期日"), { target: { value: futureDate } })
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
    const { getByPlaceholderText, getByTestId } = render(<App />);
    const taskName = "New Task";
    fireEvent.change(getByPlaceholderText(/タスクの名前/i), { target: { value: taskName } });
    fireEvent.click(getByTestId('adding-task-button'));
    const Element = await screen.findByText(taskName);
    expect(Element).toBeInTheDocument();
  });

  test('fetchDog function retrieves data correctly', async () => {
    const dogApiResponse = {
      message: 'https://images.dog.ceo/breeds/dog-image.jpg',
      status: 'success'
    };

    nock('https://dog.ceo')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/api/breeds/image/random')
      .reply(200, dogApiResponse);

    const {getByPlaceholderText, getByTestId} = render(<App />);

    const taskName = "New Task";
    fireEvent.change(getByPlaceholderText(/タスクの名前/i), { target: { value: taskName } });
    fireEvent.click(getByTestId('adding-task-button'));
    const checkBox = screen.getByTestId('checkbox');
    fireEvent.click(checkBox);
    await waitFor(() => screen.getByTestId('dogImage'));
    expect(screen.getByTestId('dogImage')).toHaveAttribute('src', 'https://images.dog.ceo/breeds/dog-image.jpg');
  });

  /* test('fetchTips function retrieves data correctly', async () => {
    const tipsApiResponse = {
      slip: {
        id: 1,
        advice: 'Test advice'
      }
    };

    nock('https://api.adviceslip.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/advice')
      .reply(200, tipsApiResponse);

      const {getByPlaceholderText, getByTestId} = render(<App />);

    const taskName = "New Task";
    fireEvent.change(getByPlaceholderText(/タスクの名前/i), { target: { value: taskName } });
    fireEvent.click(getByTestId('adding-task-button'));
    const checkBox = screen.getByTestId('checkbox'); 
    for(let i = 0; i < 6; i ++){
      fireEvent.click(checkBox);
    }

    await waitFor(() => screen.getByTestId('checkbox'));
    expect(screen.getByText('checkbox')).toBeInTheDocument();
  }); */
});

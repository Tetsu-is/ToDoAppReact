import { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './input.css';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [dogImage, setDogImage] = useState();
  const [count, setCount] = useState(0);
  const [tips, setTips] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [assignment, setAssignment] = useState("member1");


  const todoNameRef = useRef();

  const handleAddTodo = () => {
    //タスクを追加する。
    const name = todoNameRef.current.value;
    if (name === "") return;

    const newTodo = {
      id: uuidv4(),
      name: name,
      completed: false,
      date: selectedDate,
      assignment: assignment
    }
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });

    todoNameRef.current.value = null;

  };

  const fetchDog = async (todo) => {
    try {
      const response = await axios.get("https://dog.ceo/api/breeds/image/random");
      const imageUrl = response.data.message;

      if (todo.completed === true) {
        setDogImage(
          <img src={imageUrl} alt='dogImage' style={{ height: "120px", width: "auto" }} />
        )
        setCount(prevCount => prevCount += 1)
        if (count % 3 === 2) {
          fetchTips();
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchTips = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const tip = response.data.slip.advice;
      setTips(<p>{tip}</p>);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
    fetchDog(todo);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }


  useEffect(()=> {
    const sortTodosByDate = () => {
      const sortedTodos = [...todos].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      setTodos(sortedTodos);
    };

    sortTodosByDate()},[todos])

  return (
    <div className='' style={{ padding: "50px" }}>
      <div>{count}</div>
      <div className=''>
        <div className='p-10 rounded-xl bg-red-400'>
          <input className='justify-around mr-2 rounded-sm p-1' type='text' ref={todoNameRef} />
          <input className='justify-around mr-2 rounded-sm p-1' type='date' onChange={(e) => setSelectedDate(e.target.value)} />
          <select className='mr-2 rouded-sm p-1'>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
          <select className='mr-2 rounded-sm p-1'>
            <option value="work">仕事</option>
            <option value="housework">家事</option>
            <option value="friend">友人</option>
          </select>
          <select className='mr-2 rounded-sm p-1'  onChange={(e) => setAsignment(e.target.value)}>
            <option value="member1">メンバー１</option>
            <option value="member2">メンバー２</option>
            <option value="member3">メンバー３</option>
            <option value="member3">メンバー４</option>
          </select>
          <button className='bg-white mr-2 rounded-sm p-1' onClick={handleAddTodo}>タスクを追加</button>
          <button className='bg-white rounded-sm p-1' onClick={handleClear}>タスクを削除</button>
        </div>
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
      {dogImage}
      {tips}
    </div>
  );
}

export default App;

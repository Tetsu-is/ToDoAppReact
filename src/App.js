import { useState, useRef } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './input.css';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [dogImage, setDogImage] = useState();
  const [count, setCount] = useState(0);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    //タスクを追加する。
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });

    todoNameRef.current.value = null;

  };

  const fetchDog = async (todo) => {
    try {
      const response = await axios.get("https://dog.ceo/api/breeds/image/random");
      const imageUrl = response.data.message;

      if (todo.completed === true) {
        setDogImage(
          <img src={imageUrl} alt='dogImage' />
        )
        setCount(prevCount => prevCount += 1)
        if (count !== 0 && count % 3 === 0) {
          fetchTips();
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchTips = async () => {
    try {
      const response = await axios.get("");
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

  return (
    <>
      <div>{count}</div>
      <div className='p-20 flex justify-center'>
        <div className='p-10 rounded-xl bg-red-400'>
          <input className='justify-around mr-2 rounded-sm p-1' type='text' ref={todoNameRef} />
          <select className='mr-2 rounded-sm p-1'>
            <option value="work">仕事</option>
            <option value="housework">家事</option>
            <option value="friend">友人</option>
          </select>
          <button className='bg-white mr-2 rounded-sm p-1' onClick={handleAddTodo}>タスクを追加</button>
          <button className='bg-white rounded-sm p-1' onClick={handleClear}>タスクを削除</button>
        </div>
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
      {dogImage}
    </>
  );
}

export default App;

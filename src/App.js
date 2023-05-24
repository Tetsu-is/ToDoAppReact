import { useState, useRef} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './input.css';
import axios from 'axios';

function App() {
  //todoのサンプル
  const sample = [
    {
      id: uuidv4(),
      name: "仕事１",
      completed: false,
      date: "2023-5-1",
      priority: "1",
      assignment: "Takeshi"
    },
    {
      id: uuidv4(),
      name: "仕事2",
      completed: false,
      date: "2023-5-1",
      priority: "2",
      assignment: "Takeshi"
    },
    {
      id: uuidv4(),
      name: "家事１",
      completed: false,
      date: "2023-5-1",
      priority: "3",
      assignment: "Takeshi"
    },
    {
      id: uuidv4(),
      name: "家事2",
      completed: false,
      date: "2023-5-1",
      priority: "1",
      assignment: "Takeshi"
    }
  ];

  const [todos, setTodos] = useState(sample);
  const [dogImage, setDogImage] = useState();
  const [count, setCount] = useState(0);
  const [tips, setTips] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [priority, setPriority] = useState(0);
  const [assignment, setAssignment] = useState("member1");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState();
  const [displayTodos, setDisplayTodos] = useState(todos);



  const todoNameRef = useRef();

  //タスクを追加
  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === "") return;

    const newTodo = {
      id: uuidv4(),
      name: name,
      completed: false,
      date: selectedDate,
      priority: priority,
      assignment: assignment
    }
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });

    todoNameRef.current.value = null;
    sortTodosByDate()

  };

  //犬の画像を取得
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

  //Tipsを取得
  const fetchTips = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const tip = response.data.slip.advice;
      setTips(<p>{tip}</p>);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  //checkのbooleanを反転する
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
    fetchDog(todo);
  };

  //checkがfalseの要素を消す
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    sortTodosByDate();
  }


  //検索ボタン⇛検索関数
  const handleSearch = () => {
    const newFilteredTodos = todos.filter((todo) => todo.name.includes(searchTerm));
    setFilteredTodos(newFilteredTodos);
    setDisplayTodos(newFilteredTodos);
  };


  //検索・ソート解除関数
  const handleReset = () => {
    setDisplayTodos(todos);
  }



  //todo更新時に日付順にソートする
  const sortTodosByDate = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    setTodos(sortedTodos);
  };


  console.log(todos);
  return (
    <div className='' style={{ padding: "50px" }}>
      <div>{count}</div>
      <div>
        <div className='p-10 rounded-xl bg-red-400'>
          <input className='justify-around mr-2 rounded-sm p-1' type='text' ref={todoNameRef} />
          <input className='justify-around mr-2 rounded-sm p-1' type='date' onChange={(e) => setSelectedDate(e.target.value)} />
          <select className='mr-2 rouded-sm p-1' onChange={(e) => setPriority(parseInt(e.target.value))}>
            <option value="1">高</option>
            <option value="2">中</option>
            <option value="3">低</option>
          </select>
          <select className='mr-2 rounded-sm p-1'>
            <option value="work">仕事</option>
            <option value="housework">家事</option>
            <option value="friend">友人</option>
          </select>
          <select className='mr-2 rounded-sm p-1' onChange={(e) => setAssignment(e.target.value)}>
            <option value="member1">メンバー１</option>
            <option value="member2">メンバー２</option>
            <option value="member3">メンバー３</option>
            <option value="member3">メンバー４</option>
          </select>
          <button className='bg-white mr-2 rounded-sm p-1' onClick={handleAddTodo}>タスクを追加</button>
          <button className='bg-white rounded-sm p-1' onClick={handleClear}>タスクを削除</button>
        </div>
      </div>
      <div className='px-10 py-5 bg-blue-200'>
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={() => handleSearch()}>検索</button>
        <button onClick={handleReset}>　検索・ソート解除</button>
      </div>
      <TodoList todos={displayTodos} toggleTodo={toggleTodo} />
      <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
      {dogImage}
      {tips}
    </div>
  );
}

export default App;

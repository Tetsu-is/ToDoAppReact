import { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './input.css';
import Modal from './Modal';

function App() {
  //todoのサンプル

  const child1 = {
    id: uuidv4(),
    name: "c1",
    completed: false
  }

  const child2 = {
    id: uuidv4(),
    name: "c2",
    completed: false
  }

  const child3 = {
    id: uuidv4(),
    name: "c3",
    completed: false
  }

  const child4 = {
    id: uuidv4(),
    name: "c4",
    completed: false
  }

  const child5 = {
    id: uuidv4(),
    name: "c5",
    completed: false
  }

  const child6 = {
    id: uuidv4(),
    name: "c6",
    completed: false
  }

  const sample = [
    {
      id: uuidv4(),
      name: "仕事１",
      completed: false,
      date: "2023-5-1",
      priority: 1,
      genre: "仕事",
      assignment: "Takeshi",
      children: [child1, child2]
    },
    {
      id: uuidv4(),
      name: "仕事2",
      completed: false,
      date: "2023-6-1",
      priority: 2,
      genre: "仕事",
      assignment: "Takeshi",
      children: [child3, child4]
    },
    {
      id: uuidv4(),
      name: "仕事3",
      completed: false,
      date: "2023-6-25",
      priority: 3,
      genre: "仕事",
      assignment: "Takeshi",
      children: [child5, child6]
    },
    {
      id: uuidv4(),
      name: "家事１",
      completed: false,
      date: "2023-6-1",
      priority: 3,
      genre: "プライベート",
      assignment: "Takeshi",
      children: []
    },
  ];

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const currentDate = `${year}-${month}-${day}`;

  const [todos, setTodos] = useState([]);
  const [dogImage, setDogImage] = useState();
  const [count, setCount] = useState(0);
  const [tips, setTips] = useState();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [priority, setPriority] = useState(1);
  const [genre, setGenre] = useState("仕事")
  const [assignment, setAssignment] = useState("member1");
  const [displayTodos, setDisplayTodos] = useState(todos);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempTodoId, setTempTodoId] = useState();


  const todoNameRef = useRef();
  const searchRef = useRef();
  const modalInputRef = useRef();
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
      genre: genre,
      assignment: assignment,
      children: []
    }

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      const sortedTodos = sortTodosByDate(updatedTodos);
      setTodos(sortedTodos);
      return sortedTodos;
    });


    todoNameRef.current.value = null;
  };

  //犬の画像を取得
  const fetchDog = async (todo) => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      const imageUrl = data.message;

      if (todo.completed === true) {
        setDogImage(
          <img src={imageUrl} alt='dogImage' data-testid='dogImage' style={{ height: "80px", width: "auto" }} />
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
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      const tip = data.slip.advice;
      setTips(<p data-testid='checkbox'>{tip}</p>);
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

  //childのboolean反転
  const toggleChildTodo = (id) => {
    console.log("toggleChild called");
    const newTodos = [...todos];
    for (const todo of newTodos) {
      const targetChild = todo.children.find((child) => child.id === id);
      if (targetChild) {
        console.log(targetChild.name);
        targetChild.completed = !targetChild.completed;
      }
    }
    setTodos(newTodos);
  }

  //checkがfalseの要素を消す
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }


  //検索ボタン⇛検索関数
  const handleSearch = () => {
    if (searchRef.current.value === "") return;
    const newFilteredTodos = todos.filter((todo) => todo.name.includes(searchRef.current.value));
    setDisplayTodos(newFilteredTodos);
  };


  //重要度ソート
  const handleSortByPriority = () => {
    const sortedTodos = [...displayTodos].sort((a, b) => {
      return a.priority - b.priority;
    });
    setDisplayTodos(sortedTodos);
  }


  //検索・ソート解除関数
  const handleReset = () => {
    setDisplayTodos(todos);
  }

  //日付順にソートする
  const sortTodosByDate = (todos) => {
    const sortedTodos = [...todos].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    return sortedTodos;
  };

  useEffect(() => {
    const newTodos = sortTodosByDate(todos);
    setDisplayTodos(newTodos);
  }, [todos])

  //modal

  const handleClose = () => {
    setModalOpen(false);
  }

  const toggleModal = (id) => {
    setModalOpen(true);
    setTempTodoId(id);
  }

  const handleSubmit = () => {
    console.log("submit");
    if (!modalInputRef.current.value) return;
    console.log("refあり");
    const child =
    {
      id: uuidv4(),
      name: modalInputRef.current.value,
      completed: false
    }
    const newTodos = [...todos];
    const targetTodo = newTodos.find((todo) => todo.id === tempTodoId);
    targetTodo.children = [...targetTodo.children, child];
    setTodos(newTodos);
    setModalOpen(false);
    modalInputRef.current.value = null;
  }

  const handleDemo = () => {
    setTodos(sample);
  }

  return (
    <div>
      <button className='bg-gray-500 p-1' onClick={handleDemo}>デモタスクを追加する</button>
      < Modal
        modalOpen={modalOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        modalInputRef={modalInputRef}
      />
      <div style={{ padding: '30px' }}>
        <div className='addingTask p-5 rounded-md bg-gray-300'>
          <h1 className='text-xl'>タスクを追加＋</h1>
          <input className='justify-around mr-2 rounded-sm p-1 placeholder:text-gray-500' type='text' ref={todoNameRef} placeholder=' タスクの名前' />
          <input className='justify-around mr-2 rounded-sm p-1' type='date' placeholder='タスクの期日' onChange={(e) => setSelectedDate(e.target.value)} />
          <select className='mr-2 rouded-sm p-1' data-testid="select-priority" onChange={(e) => setPriority(parseInt(e.target.value))}>
            <option value="1" data-testid="select-priority-option">高</option>
            <option value="2" data-testid="select-priority-option">中</option>
            <option value="3" data-testid="select-priority-option">低</option>
          </select>
          <select className='mr-2 rounded-sm p-1' data-testid="select-genre" onChange={(e) => setGenre(e.target.value)}>
            <option value="仕事" data-testid="select-genre-option">仕事</option>
            <option value="プライベート" data-testid="select-genre-option">プライベート</option>
          </select>
          <select className='mr-2 rounded-sm p-1' data-testid='select-assignment' onChange={(e) => setAssignment(e.target.value)}>
            <option value="member1" data-testid='select-assignment-option'>メンバー１</option>
            <option value="member2" data-testid='select-assignment-option'>メンバー２</option>
            <option value="member3" data-testid='select-assignment-option'>メンバー３</option>
            <option value="member3" data-testid='select-assignment-option'>メンバー４</option>
          </select>
          <button className='bg-white mr-2 rounded-sm px-5 py-1' data-testid='adding-task-button' onClick={handleAddTodo}> 追加 + </button>
          <button className='bg-white rounded-sm p-1 px-5' data-testid='adding-delete-button' onClick={handleClear}>タスクを削除</button>
        </div>
        <div className='searching m-5 rounded-full px-10 py-1 bg-blue-200'>
          <h1 className='text-md'>タスクを検索</h1>
          <input className='mr-2 rounded-md placeholder:text-gray-500' type="text" ref={searchRef} placeholder=' タスク名で検索' />
          <button className='mr-2 py-0.5 p-1 px-2 bg-white rounded-md' onClick={() => handleSearch()}>検索</button>
          <button className='mr-2 py-0.5 p-1 px-2 bg-white rounded-md' onClick={handleSortByPriority}>重要度順</button>
          <button className='bg-white py-0.5 px-2 p-1 rounded-md' onClick={handleReset}>検索・ソート解除</button>
        </div>
        <div className='px-10'>
          <div className='dog flex p-2 border-b-2'>
            <div className='mx-10'>{dogImage}</div>
            <div className='tips bg-gray-300 rounded-full mt-10 text-lg py-1 px-10'>{tips}</div>
          </div>
        </div>

        <TodoList
          todos={displayTodos}
          toggleTodo={toggleTodo}
          toggleChildTodo={toggleChildTodo}
          toggleModal={toggleModal}
        />
      </div>
    </div>
  );
}

export default App;

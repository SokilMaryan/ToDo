import './App.css'
import {useEffect, useState,} from "react";
import Form from "../Form/Form";

function App() {
  const [todos, setTodos] = useState([])
  const [allActiveTodos,  setallActiveTodos] = useState(0)
  const [filtered, setFiltered] = useState(todos)
  const [active, setActive] = useState(null);

  // Button Array => setdataButton
  const [dataButton, setdataButton] = useState([]);


  useEffect( () => {
    // count Complite to do
    // setAllComplite(todos.filter(todo => todo.done === true).length);

    // count Active to do
    setallActiveTodos(todos.filter(todo => todo.done === false).length);
    // updates arr filtered
    setFiltered(todos.filter(todo => todo.done === false))

    setdataButton([{
      id: 1,
      tabTitle: 'All todos' ,
      clasName: "btn-filter",
      tabClicked: false,
      status: 'all'
    },
      {
        id: 2,
        tabTitle: "Active",
        clasName: "btn-filter",
        tabClicked: false,
        status: false
      },
      {
        id: 3,
        tabTitle: "Complete",
        clasName: "btn-filter",
        tabClicked: false,
        status: true
      }])
  }, [todos]);


  const putTodo = (value) => {
    if (value) {
      setTodos([...todos, {id: Date.now(), text: value, done: false}])
      setallActiveTodos(allActiveTodos + 1)
    } else {
      alert('введіть текст')
    }
  }

  const togleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        done: !todo.done,
      }
    }))
  }

  const removeTodo = (id) => {
    let newTodo = [...todos].filter(todo => todo.id !== id)
    setTodos(newTodo);
    setallActiveTodos(allActiveTodos - 1);
    navigate(id=2)  // default  const navigate id:2 (Active - navigatin button)
  }

  const clearTodosCompleted = (id) => {
    let newTodo = [...todos].filter(todo => todo.done !== true)
    setTodos(newTodo)
    setallActiveTodos(0)
    navigate(id=2)  // default  const navigate id:2 (Active - navigatin button)
  }

  function todoFilter(done) {
    if (done === 'all') {
      setFiltered(todos)
    } else if ( done === true) {
      let newTodo = [...todos].filter(todo => todo.done);
      setFiltered(newTodo)
    } else  {
      let newTodo = [...todos].filter(todo => !todo.done);
      setFiltered(newTodo)
    }
  }


  const NavLink = ({ id, tabTitle, isActive, clasName, status }) => {
    return (
        <button
            onClick={() => {navigate(id); todoFilter(status)}}
            className={isActive ? "active" : clasName}
        >
          {tabTitle}
        </button>
    );
  };

  const navigate = (id) => {
    setActive(id);
  };




  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">Todolist</h1>

        {
          todos.length > 0 ? (
              <div>
                <Form
                    putTodo={putTodo}
                />

                <ul className="todos">
                  {
                    filtered.map(todo => {
                      return (
                          <li className={todo.done ? "todo done" : "todo" }
                              key={todo.id}
                              onClick={() =>togleTodo (todo.id)}>

                            <img src= {!todo.done ? "/circle.svg" : "/done.svg" }
                                 alt="todoImg"
                                 className="todoImg"
                                 onClick={() => togleTodo(todo.id)}
                            />
                            <span className="todoText">{todo.text}</span>

                            <img src= "/delete.svg"
                                 alt="delete"
                                 className="delete"
                                 onClick={e => {
                                   e.stopPropagation();
                                   removeTodo(todo.id);
                                 }}
                            />
                          </li>
                      );
                    })
                  }

                  <div className="todos-foter">
                    <span className='countActive-todos'> <b>{allActiveTodos}</b> item left</span>
                    <div className='todos-foter-li'>
                      {dataButton.map((item) => (
                          <li key={item.id}>
                            <NavLink {...item} isActive={active === item.id} onClick={navigate} />
                          </li>
                      ))}
                    </div>
                    <button className="btn-clear" onClick={clearTodosCompleted}>Clear Completed</button>
                  </div>

                </ul>
              </div>
          ) : (
              <Form
                putTodo={putTodo}
              />)
        }

        <footer >
          <h1 className='footerTitle'>press Enter to add item</h1>
          <span className='footerTitleBottom'>created by <b>Marian Sokil</b></span>
        </footer>
      </div>
    </div>
  );
}

export default App;

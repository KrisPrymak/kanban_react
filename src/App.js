import React from "react";
import "./App.css";
import Board from "./components/Board";
import "./index.scss";
import { useState, useEffect } from "react";
import ava from "./img/ava.svg";
import arrowDown from "./img/arrow_down.svg";
import arrowUp from "./img/arrow_up.svg";
import FullTask from "./components/FullTask";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isActiveFullTask, setIsActiveFullTask] = useState(false);

  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Backlog",
      tasks: [
        {
          id: 2,
          name: "Login page - performance issues",
          description: "anything",
        },
        { id: 3, name: "Sprint bugfix", description: "Lorem ipsum" },
      ],
    },
    {
      id: 4,
      title: "Ready",
      tasks: [
        {
          id: 5,
          name: "Shop page - performance issues",
          description: "anything",
        },
        { id: 6, name: "Checkout bugfix", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance"},
        { id: 7, name: "Shop bug1", description: "Description Lorem ipsum" },
        { id: 8, name: "Shop bug2", description: "Lorem ipsum" },
        { id: 9, name: "Shop bug3", description: "Lorem ipsum" },
      ],
    },
    {
      id: 10,
      title: "In Progress",
      tasks: [
        {
          id: 11,
          name: "User page - performance issues",
          description: "anything",
        },
        { id: 12, name: "Auth bugfix", description: "Lorem ipsum" },
      ],
    },

    {
      id: 13,
      title: "Finished",
      tasks: [
        {
          id: 14,
          name: "Main page - performance issues",
          description: "anything",
        },

        { id: 15, name: "Main page bugfix", description: "Lorem ipsum" },

      ],
    },

  ]);

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  const chooseNewTask = (taskId, boardId, prevBoardId) => {
    let curTask = {};
    boards.map(b => b.tasks.map(t => t.id === taskId ? curTask = t : t));
    setBoards([...boards.map(b => b.id === prevBoardId ? {...b, tasks: [...b.tasks.filter(t => t.id !== taskId)]} : b)])
    setBoards(prevBoards => [...prevBoards.map(b => b.id === boardId ? {...b, tasks: [...b.tasks, curTask]} : b)])
  }

  let activeTask = 0;
  let finishedTasks = 0;

  boards.map((b) =>
    b.title !== "Finished"
      ? (activeTask += b.tasks.length)
      : (finishedTasks += b.tasks.length)
  );

  const addNewCard = (name, boardId) => {
    if (name) {
      const newTask = {
        id: Math.floor(Math.random() * 60000),
        name,
      };
      setBoards([
        ...boards.map((b) =>
          b.id === boardId ? { ...b, tasks: [...b.tasks, newTask] } : b
        ),
      ]);
    }
  };

  const toggleMenu = (value) => {
    setIsActiveMenu(value);
  };

  let choosedTask = {};

  const openFullTask = (taskId) => {
    choosedTask = boards.map(b => b.tasks.filter(t => t.id === taskId))
    setIsActiveFullTask(true);
  }

  const closeFullTask = () => {
    setIsActiveFullTask(false);
  }

  return (
    <div className="app">
      <div>
        <div className="app__header">
          <h1 className="app__header-title">Awesome kanban board</h1>
          <div className="app__ava-group">
            <img className="app__ava" src={ava} alt="img" />
            <div>
              <img
                onClick={() => {
                  toggleMenu(true);
                }}
                className={isActiveMenu ? "hidden" : "cursPointer"}
                src={arrowDown}
                alt="arrow_down"
              />
              <img
                onClick={() => {
                  toggleMenu(false);
                }}
                className={isActiveMenu ? "cursPointer" : "hidden"}
                src={arrowUp}
                alt="arrow_up"
              />
            </div>
            <div className={isActiveMenu ? "app__menu" : "hidden"}>
              <ul>
                <li>Profile</li>
                <li>Log out</li>
              </ul>
              <div className="app__menu-rect"></div>
            </div>
          </div>
        </div>
        <div className={isActiveFullTask ? 'hidden' : "app__cards"}>
          {boards.map((board, i) => {
            let prevBoardIndex;
            if (i === 0) {
              prevBoardIndex = 0
            } else {
              prevBoardIndex = i - 1
            }
            return (
              <Routes>
                <Route path="/" element={<Board
                key={board.id}
                board={board}
                addNewCard={addNewCard}
                prevBoardId={boards[prevBoardIndex].id}
                prevTasks={boards[prevBoardIndex].tasks}
                chooseNewTask={chooseNewTask}
                openFullTask={openFullTask}
              />}/>
              </Routes>
            );
          })}
        </div>
        <div className={isActiveFullTask ? '' : 'hidden'}>
          <Routes>
            <Route path="/:boardId/:taskId" element={<FullTask task={choosedTask}
          closeFullTask={closeFullTask} boards={boards}
          />}/>
          </Routes>
        </div>
      </div>
      <div className="app__footer">
        <div className="app__footer-count">
          <p>Active tasks: {activeTask}</p>
          <p>Finished tasks: {finishedTasks}</p>
        </div>
        <div>Kanban board by Kristina Priimak, 2023</div>
      </div>
    </div>
  );
}

export default App;

// const [backlog, setBacklog] = useState([
//   {id: 1, title: 'Backlog', tasks: [
//     {id: 2, name: 'Login page - performance issues', description: 'anything'},
//     {id: 3, name: 'Sprint bugfix', description: 'Lorem ipsum'},
//   ]}
// ])

// const [ready, setReady] = useState([
//   {id: 4, title: 'Ready', tasks: [
//     {id: 5, name: 'Shop page - performance issues', description: 'anything'},
//     {id: 6, name: 'Checkout bugfix', description: 'Lorem ipsum'},
//     {id: 7, name: 'Shop bug1', description: 'Lorem ipsum'},
//     {id: 8, name: 'Shop bug2', description: 'Lorem ipsum'},
//     {id: 9, name: 'Shop bug3', description: 'Lorem ipsum'},
//   ]}
// ])

// const [inProgress, setInProgress] = useState([
//   {id: 10, title: 'In Progress', tasks: [
//     {id: 11, name: 'User page - performance issues', description: 'anything'},
//     {id: 12, name: 'Auth bugfix', description: 'Lorem ipsum'},
//   ]}
// ])

// const [finished, setFinished] = useState([
//   {id: 13, title: 'Finished', tasks: [
//     {id: 14, name: 'Main page - performance issues', description: 'anything'},
//     {id: 15, name: 'Main page bugfix', description: 'Lorem ipsum'},
//   ]}
// ])

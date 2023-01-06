import React from "react";
import "./../index.scss";
import Button from "./Button";
import CardForm from "./CardForm";
import Task from "./Task";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { NavLink } from "react-router-dom";

const Board = ({
  board,
  addNewCard,
  prevTasks,
  prevBoardId,
  chooseNewTask,
  openFullTask,
}) => {
  const [activeForm, setActiveForm] = useState(false);
  const [activeList, setActiveList] = useState(false);

  const openForm = () => {
    setActiveForm(true);
  };

  const addCard = (name) => {
    setActiveForm(false);
    addNewCard(name, board.id);
  };

  const openList = () => {
    setActiveList(true);
  };

  const getBoard = (taskId, prevBoardId) => {
    chooseNewTask(taskId, board.id, prevBoardId);
    setActiveList(false);
  };

  return (
    <div className="board">
      <p className="board__title">{board.title}</p>
      {board.tasks.map((task) => {
        return (
          <NavLink to={"/" + board.id + "/" + task.id}>
            <Task task={task} key={task.id} action={openFullTask} />
          </NavLink>
        );
      })}
      <div
        className={
          activeForm || (board.tasks.length === 0 && board.title === "Backlog")
            ? ""
            : "hidden"
        }
      >
        <CardForm addCard={addCard} />
      </div>
      <div className={activeList ? "" : "hidden"}>
        <Dropdown
          key={board.id}
          prevTasks={prevTasks}
          chooseNewTask={getBoard}
          prevBoardId={prevBoardId}
        />
      </div>
      <div
        className={
          activeForm ||
          activeList ||
          (board.tasks.length === 0 && board.title === "Backlog")
            ? "hidden"
            : ""
        }
      >
        <Button
          prevTasks={prevTasks}
          boardTitle={board}
          action={board.title === "Backlog" ? openForm : openList}
          text="+ Add card"
        />
      </div>
    </div>
  );
};

export default Board;

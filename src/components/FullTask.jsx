import React from "react";
import { NavLink, useParams } from "react-router-dom";
import cross from "./../img/cross.png";

const FullTask = ({ task, closeFullTask, boards }) => {
  const { boardId, taskId } = useParams();
  let curTask = boards
    .filter((b) => b.id === +boardId)[0]
    .tasks.filter((t) => t.id === +taskId)[0];
  return (
    <div className="fullTask">
      <h1 className="fullTask-title">{curTask.name}</h1>
      <p className="fullTask-description">{curTask.description}</p>
      <NavLink to={"/"} className="fulTask__cross">
        <img
          className="cursPointer"
          onClick={closeFullTask}
          src={cross}
          alt="cross"
        />
      </NavLink>
    </div>
  );
};

export default FullTask;

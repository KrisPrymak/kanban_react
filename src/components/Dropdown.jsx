import React from "react";
import tickDown from "./../img/tick_down.svg";
import { useState } from "react";
import DropdownList from "./DropdownList";

const Dropdown = ({ prevTasks, prevBoardId, chooseNewTask }) => {
  const [isActiveList, setIsActiveMenu] = useState(false);

  const openList = () => {
    setIsActiveMenu(true);
  };

  const closeList = (taskId, prevBoardId) => {
    setIsActiveMenu(false);
    chooseNewTask(taskId, prevBoardId);
  };

  return (
    <div className="dropdown-box">
      <div className="dropdown">
        <img
          className="cursPointer"
          onClick={openList}
          src={tickDown}
          alt="tick_down"
        />
      </div>
      <div className={isActiveList ? "" : "hidden"}>
        <DropdownList
          prevTasks={prevTasks}
          closeList={closeList}
          prevBoardId={prevBoardId}
        />
      </div>
    </div>
  );
};

export default Dropdown;

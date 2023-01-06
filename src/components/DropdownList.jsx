import React from "react";
import Task from "./Task";

const DropdownList = ({ prevTasks, prevBoardId, closeList }) => {
  return (
    <div>
      {prevTasks.map((t) => {
        return (
          <Task
            key={t.id}
            task={t}
            action={() => {
              closeList(t.id, prevBoardId);
            }}
          />
        );
      })}
    </div>
  );
};

export default DropdownList;

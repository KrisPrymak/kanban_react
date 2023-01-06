import React from "react";

const Task = ({ task, action, prevBoardId }) => {
  return (
    <div className="task" onClick={() => action(task.id, prevBoardId)}>
      {task.name}
    </div>
  );
};

export default Task;

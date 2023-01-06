import React from "react";

const Button = ({ action, text, prevTasks, boardTitle }) => {
  return (
    <button
      disabled={boardTitle !== "Backlog" && prevTasks.length === 0}
      className="button"
      onClick={action}
    >
      {text}
    </button>
  );
};

export default Button;

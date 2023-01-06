import React from "react";
import { useState } from "react";

const CardForm = ({ addCard }) => {
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.currentTarget.value);
  };

  const handleSusmit = (e) => {
    e.preventDefault();
    addCard(inputText);
    setInputText("");
  };

  return (
    <form className="cardForm" onSubmit={handleSusmit}>
      <input
        className="inputForm"
        type="text"
        placeholder=" "
        value={inputText}
        onChange={handleChange}
      />
      <button className="button-submit">Submit</button>
    </form>
  );
};

export default CardForm;

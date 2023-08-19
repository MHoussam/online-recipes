import React from "react";

const Button = ({ text, onClick }) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <button className="button pointer bold" onClick={clickHandler} >
      {text}
    </button>
  );
};

export default Button;

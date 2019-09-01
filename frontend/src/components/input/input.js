import React from "react";
import "./input.css";

const Input = props => {
  return (
    <input
      className={`input ${props.className}`}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
};

export default Input;

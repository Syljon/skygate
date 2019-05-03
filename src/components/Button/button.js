import React from "react";
import "./button.css";

const button = props => (
  <button
    type={props.btnType}
    className={["btn", ...props.btnClasses].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;

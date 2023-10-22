import React from "react";

function Button({text, OnClickFunc}) {
  return <button onClick={OnClickFunc}>{text}</button>;
}

export default Button
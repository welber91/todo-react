import React, { useState, useEffect } from "react";

function Insert(props) {
  const [text, setText] = useState(props.text || "");
  let inputElement = null;

  useEffect(() => {
    inputElement.focus();
  }, []);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(text);
    }
  }, [text]);

  return (
    <input
      style={{ width: 400 }}
      ref={(input) => {
        inputElement = input;
      }}
      type="text"
      value={text}
      onChange={(e) => {
        e.preventDefault();
        setText(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.keyCode == 13) {
          props.onSubmit(text);
          setText("");
        }
      }}
      onFocus={(e) => {
        if (props.onFocus) {
          props.onFocus();
        }
      }}
    ></input>
  );
}

export default Insert;

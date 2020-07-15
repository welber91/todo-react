import React, { useState } from "react";
import Insert from "./Insert";

function Item(props) {
  const onSubmitText = (title) => {
    if (title.length == 0) {
      props.remove(props.id);
    } else {
      props.edit(props.id, title);
    }
    props.setEditMode(null);
  };

  const onChangeText = (title) => {
    if (title.length == 0) {
      props.remove(props.id);
    } else {
      props.edit(props.id, title);
    }
  };

  const displayItem = () => {
    if (props.editMode) {
      return (
        <>
          <span>
            <Insert
              text={props.title}
              onSubmit={onSubmitText}
              onChange={onChangeText}
            />
          </span>
          <button
            onClick={(e) => {
              props.setEditMode(null);
              props.remove(props.id);
            }}
          >
            X
          </button>
        </>
      );
    } else {
      return (
        <span
          onClick={(e) => {
            props.setEditMode(props.id);
          }}
          style={{ width: 200, display: "inline-block", textAlign: "left" }}
        >
          {displayText()}
        </span>
      );
    }
  };

  const displayText = () => {
    if (!props.done) {
      return props.title;
    } else {
      return (
        <span style={{ textDecoration: "line-through", color: "gray" }}>
          {props.title}
        </span>
      );
    }
  };

  return (
    <div key={props.id}>
      <span>
        <input
          type="checkbox"
          id={props.id}
          checked={props.done}
          onChange={(e) => {
            props.toggle(props.id);
            props.setEditMode(null);
          }}
        />
        {displayItem()}
      </span>
    </div>
  );
}

export default Item;

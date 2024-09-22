import React from 'react';

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.label)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.label}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;

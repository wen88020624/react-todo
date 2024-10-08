import React, { useState } from 'react';

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (newName.trim()) {
      props.editTask(props.id, newName);
      setNewName('');
      setEditing(false);
    }
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          old task name: "{props.name}"
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          cancel
          <span className="visually-hidden">rename {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          save
          <span className="visually-hidden">new name {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;

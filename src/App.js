import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo.jsx';
import Form from './components/Form.jsx';
import FilterButton from './components/FilterButton.jsx';

const FILTER_MAP = {
  All: () => true,
  Done: task => task.completed,
  Active: task => !task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState(props.tasks || []);

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed} 
        key={task.id}
        toggleCompleted={toggleTaskCompleted}
      />
    ));

  return (
    <div className="todoapp stack-large">
      <h1>To-do List</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        {FILTER_NAMES.map(name => (
          <FilterButton 
            key={name} 
            label={name} 
            isPressed={name === filter}
            setFilter={setFilter}
          />
        ))}
      </div>
      <h2 id="list-heading">
        {taskList.length} tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;

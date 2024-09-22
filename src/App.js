import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

function App(props) {
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState(props.tasks || []);

  const FILTER_MAP = {
    All: () => true,
    Done: task => task.completed,
    Active: task => !task.completed
  };
  
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  function addTask(name) {
    const newTask = { id: "todo-" + Date.now(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task =>
      task.id === id ? { ...task, name: newName } : task
    );
    setTasks(editedTaskList);
  }

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed} 
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

    const filterList = FILTER_NAMES.map(name => (
      <FilterButton
        key={name}
        name={name}
        label={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    ));

  return (
    <div className="todoapp stack-large">
      <h1>To-do List</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
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

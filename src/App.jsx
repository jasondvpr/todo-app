import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./App.css";

function App() {
  const [Input, setInput] = useState({
    day: "",
    todo: "",
  });
  const [TodoList, setTodoList] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  // Handle Event
  const handleInput = (e) => {
    setInput({ ...Input, todo: e.currentTarget.value });
  };

  const handleSelect = (e) => {
    setInput({ ...Input, day: e.currentTarget.value });
  };

  // Button Add and Delete Todo
  const handleAddButton = (e) => {
    if (Input.day === "" || Input.todo === "") {
      e.preventDefault();
    } else {
      setTodoList({ ...TodoList, [Input.day]: [...TodoList[Input.day], Input.todo] });
    }
  };

  const handleDeleteButton = (day, id) => {
    const filterTodo = TodoList[day].filter((value, idx) => {
      return id !== idx;
    });
    setTodoList({
      ...TodoList,
      [day]: filterTodo,
    });
    console.log(TodoList, day);
  };

  return (
    <div className="todo-app">
      <div className="content">
        <div className="title">
          <h1>Todo List</h1>
          <p>List your activity to manage your time</p>
        </div>
        <div className="todo-input">
          <input type="text" name="todo-input" id="input-todo" placeholder="Add your Todo..." value={Input.todo} onChange={handleInput} />
          <select className="btn-primary" name="day" id="select-day" onChange={handleSelect}>
            <option value="">- Select Day -</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
          <button className="btn-primary" id="btn-add" onClick={handleAddButton}>
            <p>Add</p>
          </button>
        </div>

        <div className="todo-list">
          {Object.keys(TodoList).map((value, idx) => (
            <div className="todo-day" key={idx}>
              <h3 className="day">{value}</h3>
              <div className="todo-day-list">
                {Object.values(TodoList[value]).map((list, idxTwo) => (
                  <div className="todo" key={idxTwo}>
                    <p>{list}</p>
                    <button className="btn-close" onClick={() => handleDeleteButton(value, idxTwo)}>
                      <p>
                        <FaTimes />
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

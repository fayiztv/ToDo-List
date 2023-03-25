import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { MdDoneOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if(todo.trim() !== ''){
      setTodos([...todos,{list:todo,id:Date.now(),status:false}]);
      setTodo("");
    }
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id)=>{
    setTodos(todos.filter((to)=>to.id !== id))
  }

  const onComplete = (id)=>{
    let complete = todos.map((list)=>{
      if(list.id === id){
        return ({...list , status : !list.status})
      }
      return list
    })
    setTodos(complete)
  }

  return (
    <div className="container">
      <h2>Todo App</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your tasks"
          className="form-control"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}>ADD</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((toDo) => (
            <li className="list-items">
               <div className="list-item-list" id={toDo.status ? 'list-item' : '' } > {toDo.list}</div>
              <MdDoneOutline
                className="list-item-icons"
                id="done"
                title="completed"
                onClick={()=>onComplete(toDo.id)}
              />
              <MdDelete
                className="list-item-icons"
                id="delete"
                title="delete"
                onClick={()=>onDelete(toDo.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;

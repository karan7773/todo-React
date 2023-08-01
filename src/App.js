import React, { useState } from "react";
import "./App.css";

let gIndex = 0;

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [complete,setComplete]=useState(false);

  function createTodo() {
    setTodos((oldTodos) => {
      setTask("");
      console.log(oldTodos);
      return [...oldTodos, { todo: task, id: gIndex++, completed: complete }];
    });
  }

  function deleteTodo(itemId) {
    setTodos((oldTodos) => {
      // console.log(oldTodos)
      return oldTodos.filter((item) => item.id !== itemId);
    });
  }

  function todocompleted(item) {
    console.log(item.completed)
    item.completed = !item.completed;
    setComplete(item.completed)
    // window.location.reload()
  }

  const [editVal,seteditval]=useState({todo:'',id:null,completed: complete });

  function handleEdit(value,eid){
    seteditval({...editVal,todo:value,id:eid});
  }

  function handleSave(){
    // console.log(editVal.id)
    const updatedTodos = todos.map((tods) =>
      tods.id === editVal.id ? { ...tods, todo: editVal.todo } : tods
    );
    // console.log(updatedTodos);
    setTodos(updatedTodos);
    seteditval({todo:'',id:null,completed: false });
  }


  return (
    <div className="container mt-4">
      <h1 className="text-center">Todo</h1>
      <div className="row offset-3 col-lg-6">
        <input
          className="form-control"
          type="text"
          value={task}
          onChange={(event) => {
            setTask(event.target.value);
          }}
        />
        <button className="btn btn-primary w-25 offset-4" type="submit" onClick={createTodo}>add</button>
      </div>
      <ul>
        {todos.map((item) => {
          return (
            <div key={item.id} className="d-flex justify-content-center ">
              {editVal.id === item.id ? (
              <div className="mt-3 row col-lg-4">
                <li>
                  <input
                  className="form-control"
                  type="text"
                  value={editVal.todo}
                  onChange={(event) => seteditval({ ...editVal, todo: event.target.value })}
                />
                <button className="btn btn-primary w-25 offset-4" onClick={handleSave}>Save</button>
                </li>
              </div>
             ):
              <div className="mt-3 row col-lg-4" key={item.id}>
                <input type="checkbox" onClick={() => todocompleted(item)} />
                <li style={{
                    textDecoration: item.completed ? "line-through" : "none"
                  }}>
                  {item.todo}
                </li>
                <div className="row">
                  <button className="btn btn-primary w-25 offset-2" onClick={()=>handleEdit(item.todo,item.id)}>Edit</button>
                  <button className="btn btn-primary w-25 offset-2" onClick={() => deleteTodo(item.id)}>delete</button>
                </div>
                
              </div>
            }
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;

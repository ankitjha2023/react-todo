
import { useEffect, useState } from "react";
import "./App.css"
export default function App() {
  const lstodos = JSON.parse(localStorage.getItem('todos'))  || []

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(lstodos);
  const [btnText, setBtnText] = useState("Add");
  const [editIndex, setEditIndex] = useState(null);

  const handleClick = () => {
    if (todo === "") {
      alert("Input field is empty");

    }

    else{
      if (btnText === "Add") {
     

        setTodos([...todos, todo]);
       
        setTodo("");
      } else {
        // Save changes to the edited todo
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = todo;
        setTodos(updatedTodos);
        
        setTodo("");
        setBtnText("Add");
        setEditIndex(null);
      }
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
   
  };

  const editTodo = (index) => {
    const todoToEdit = todos[index];

    setTodo(todoToEdit);
    setBtnText("Save");
    setEditIndex(index);
  };

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])
  
  return (
    <div className="container mt-5">
     
      <div className="d-flex gap-1 col-md-6 mx-auto">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="form-control"
        placeholder="Enter todo"
      />
      <input type="button" value={btnText} onClick={handleClick} className="btn btn-success" />
      <button className="btn btn-danger" onClick={()=>setTodos([])}>Clear</button>
      </div>
      <ol className="list-unstyled">{
        todos.length===0 ? <h5 className="text-center mt-3">No todo to display</h5> : <>
        {todos.map((todo, index) => (
          <li key={index} className=" bg-light my-3 py-3 border rounded">
           <span className="mx-3"> {todo}</span>
            <i onClick={() => removeTodo(index)} className="fa-solid fa-trash text-danger" ></i>
            <i onClick={() => editTodo(index)} className="fa-solid fa-edit text-info"></i>
          </li>
        ))}
        </>
}
      </ol>
    </div>
  );
}

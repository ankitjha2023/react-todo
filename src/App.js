
import { useState } from "react";
import "./App.css"
export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
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

  return (
    <div className="container mt-5">
     
      <div className="d-flex gap-3 col-md-6 mx-auto">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="form-control"
      />
      <input type="button" value={btnText} onClick={handleClick} className="btn btn-success" />
      </div>
      <ol className="list-unstyled">{
        todos.length===0 ? <>No todo to display</> : <>
        {todos.map((todo, index) => (
          <li key={index} className=" bg-light my-3 p-3">
            {todo}
            <button onClick={() => removeTodo(index)} className="btn btn-danger" >X</button>
            <button onClick={() => editTodo(index)} className="btn btn-info">Edit</button>
          </li>
        ))}
        </>
}
      </ol>
    </div>
  );
}

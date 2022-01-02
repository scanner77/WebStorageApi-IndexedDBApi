import React, {useState} from 'react';
import './App.css';

function App() {
  const[todo, setTodo] = useState('');
  const[todos, setTodos] = useState([]);
  const[editable, setEdittable] = useState(null);
  const[editingText, setEditingText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime().toString(),
      text: todo,
      completed: false
    }
    setTodos([...todos, newTodo]);
    setTodo('')
  }
  const handleDelete = (id) => {
    const deleted = todos.filter((todo) => todo.id !== id);
    setTodos(deleted)
  }
  const handleCompleted = (id) => {
    const complete = todos.map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })
    setTodos(complete)
  }

  const editTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.text = editingText;
      }
      return todo;
    })
    setTodos(updatedTodos)
    setEditingText('')
    setEdittable(null)
  }
  return (
    <div className="App">
      
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)}/>
        <input type="submit" />
      </form>

      {todos.map((todo) =><div key = {todo.id}>
      {editable === todo.id ? (
                <input 
                type='text'
                placeholder=''
                onChange={(e) => setEditingText(e.target.value)}
                value = {editingText} />
      ) : (
        <div>{todo.text}</div>
      )}
          <button onClick = {() => handleDelete(todo.id)}>delete</button>

          <input type = "checkbox" checked = {todo.completed} onClick={() => handleCompleted(todo.id)}/>

        <button onClick={() => setEdittable(todo.id)}>Edit Todo</button>
        <button onClick={() => editTodo(todo.id)}>Submit Todo</button>
        </div>
        ) 
      }
    </div>
  );
}

export default App;

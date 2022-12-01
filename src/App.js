import './App.css';
import ToDo from './components/ToDo';
import Modal from './components/Modal';
import React, { useState, useEffect, useReducer } from "react";

import { useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTodo, addTodoFirestore } from './store/TodoSlice';

import { todoList, database } from "./firebase";
// import { doc, setDoc } from "firebase/firestore"; 

function App() {

  const todos = useSelector(state => state.todos.todos);

  const [isModal, setModal] = useState(false);
  const [todo, setTodo] = useState()
  

  const dispatch = useDispatch();
  const addTask = () => {
    dispatch(addTodo({todo}))
    setTodo('');
  }

  const changeTodo = (text) => {
    setTodo(text)
  }
  
  useEffect(() => {
    todoList
    .then(result => result.map(item => dispatch(addTodoFirestore({item}))
    )) 
  }, [])


  return (
    <div className="App">
      
      <div>

           <h1>Todo List</h1>

              <ToDo todos={todos}/>

        </div>

      <button
           className="button"
           onClick={() => setModal(true)}
      >Create New Todo</button>

      <Modal
        isVisible={isModal}
        onClose={() => setModal(false)}
        todoCreate={addTask}
        handleChange={changeTodo}
      />
    </div>
  );
}

export default App;

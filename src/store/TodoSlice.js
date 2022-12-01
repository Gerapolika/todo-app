import { createSlice } from '@reduxjs/toolkit';

import { database } from "../firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 
 
const todoSlice = createSlice({
    name: 'todo',
    initialState : {
        todos: []
    },
    reducers: {
        addTodoFirestore(state, action) {
            state.todos.push({
                id: action.payload.item.id,
                todo: action.payload.item.todo ,
                done: action.payload.item.done      
            })
        },
        addTodo(state, action) {
            state.todos.push({
                id: new Date().toISOString(),
                todo: action.payload.todo,
                done: false        
            })
            setDoc(doc(database, 'Todos', new Date().toISOString()), {
                id: new Date().toISOString(),
                todo: action.payload.todo,
                done: false
            })
        },

        deleteTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.todo.id)
            deleteDoc(doc(database, "Todos", action.payload.todo.id))
        },
        completeTodo(state, action) {
            const toggleTodo = state.todos.find(todo => 
                todo.id === action.payload.todo.id);
            toggleTodo.done = !toggleTodo.done;
        }
    }
})

export const {addTodo, deleteTodo, addTodoFirestore, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;
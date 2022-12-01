import React from "react";
import deleteIcon from "./deleteIcon.png"
import { useDispatch } from "react-redux"
import { deleteTodo, completeTodo } from '../store/TodoSlice'

const ToDo = ({ todos }) => {

    const dispatch = useDispatch()

    return (
        <>
            {todos.map(todo =>
                <div className="todo" key={todo.id}>
                    <label>
                        <input type="checkbox"
                            onChange={() => dispatch(completeTodo({ todo }))}></input>
                        <span></span>
                    </label>
                    <p className={todo.done ? "completeTodo" : "notCompletedTodo"}>{todo.todo}</p>
                    <button className="delete"
                        onClick={() => dispatch(deleteTodo({ todo }))}
                    >
                        <img src={deleteIcon} className="deleteIcon" />
                    </button>

                </div>)}
        </>
    )
}

export default ToDo
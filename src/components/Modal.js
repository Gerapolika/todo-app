import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './modal.css';

const Modal = ({ isVisible = false, title, onClose, todoCreate, handleChange }) => {

  const { register, handleSubmit, reset } = useForm();
  const [isSubmit, setIsSubmit] = useState(false)

  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    reset({
      data: 'todo'
    })
  }, [isSubmit])

  function onSubmit(data) {
    console.log(data);
    todoCreate();
    setIsSubmit(prevIsSubmit => !prevIsSubmit)
    onClose();
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-header">
            <input 
            className="modal-todo"
              {...register('todo', {
                required: true,
                minLength: 1,
              })}
              placeholder="What do you want to do?"
              onChange={(e) => handleChange(e.target.value)}>{title}
            </input>
            <span className="modal-close" onClick={onClose}>
              &times;
            </span>
          </div>
          <button type="submit" className="button"
           >Create ToDo</button>
        </form>
      </div>
    </div>
  );
};

export default Modal
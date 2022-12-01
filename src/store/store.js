import { configureStore } from '@reduxjs/toolkit';
import reducer from './TodoSlice';

export default configureStore({
    reducer: { todos: reducer },
})
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './noteSlice';

export const store = configureStore({
    reducer: {
        notes: notesReducer
    }
})
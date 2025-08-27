import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notesReducer from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
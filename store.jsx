import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/auth/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

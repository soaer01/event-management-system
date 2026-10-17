import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import eventReducer from './eventSlice';
import regReducer from './regSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    regs: regReducer,
  },
});
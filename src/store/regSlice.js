import { createSlice } from '@reduxjs/toolkit';

const allRegs = JSON.parse(localStorage.getItem('user_registrations')) || [];

const regSlice = createSlice({
  name: 'regs',
  initialState: {
    myBookings: allRegs,
    msg: null
  },
  reducers: {
    addBooking: (state, action) => {
      const { userId, event } = action.payload;
      const duplicate = state.myBookings.find(b => b.userId === userId && b.event.id === event.id);
      if (duplicate) {
        state.msg = "You are already registered for this event!";
        return;
      }
      state.myBookings.push({ userId, event });
      state.msg = "Registered successfully!";
      localStorage.setItem('user_registrations', JSON.stringify(state.myBookings));
    },
    removeBooking: (state, action) => {
      const { userId, eventId } = action.payload;
      state.myBookings = state.myBookings.filter(b => !(b.userId === userId && b.event.id === eventId));
      state.msg = "Registration cancelled.";
      localStorage.setItem('user_registrations', JSON.stringify(state.myBookings));
    },
    clearMsg: (state) => {
      state.msg = null;
    }
  }
});

export const { addBooking, removeBooking, clearMsg } = regSlice.actions;
export default regSlice.reducer;
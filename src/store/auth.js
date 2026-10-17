import { createSlice } from '@reduxjs/toolkit';

const savedUsers = JSON.parse(localStorage.getItem('my_users')) || [];
const savedSession = JSON.parse(localStorage.getItem('logged_in_user')) || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: savedUsers,
    currentUser: savedSession,
    error: null,
  },
  reducers: {
    registerUser: (state, action) => {
      console.log("registering user...", action.payload);
      const { name, email, password } = action.payload;
      const exist = state.users.find(u => u.email === email);
      if (exist) {
        state.error = "User already exists with this email!";
        return;
      }
      const newUser = { id: Date.now(), name, email, password };
      state.users.push(newUser);
      state.currentUser = { id: newUser.id, name: newUser.name, email: newUser.email };
      state.error = null;
      
      localStorage.setItem('my_users', JSON.stringify(state.users));
      localStorage.setItem('logged_in_user', JSON.stringify(state.currentUser));
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(u => u.email === email && u.password === password);
      if (!user) {
        state.error = "Wrong email or password bro";
        return;
      }
      state.currentUser = { id: user.id, name: user.name, email: user.email };
      state.error = null;
      localStorage.setItem('logged_in_user', JSON.stringify(state.currentUser));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('logged_in_user');
    },
    clearErr: (state) => {
      state.error = null;
    }
  }
});

export const { registerUser, loginUser, logoutUser, clearErr } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('auth_token'),
  role: localStorage.getItem('userRole'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, role } = action.payload;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('userRole', role);
      state.token = token;
      state.role = role;
    },
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

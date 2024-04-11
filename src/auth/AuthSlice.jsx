import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('auth_token'),
  role: localStorage.getItem('userRole'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, role } = action.payload;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('userRole', role);
      state.token = token;
      state.role = role;
    },
    removeCredentials: (state) => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userRole');
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;

export default authSlice.reducer;
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/apiService';
import {type  AuthState } from '../../types';

// Get token from localStorage if it exists
const token = localStorage.getItem('jwt_token');

const initialState: AuthState = {
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue } : any) => {
    try {
      const response : any = await api.post('/login', credentials);
      localStorage.setItem('jwt_token', response.data.jwt_token);
      return response.data.jwt_token;
    } catch (error: any) {
      return rejectWithValue(error.response.data.reason || 'Login failed');
    }
  }
);

// Async Thunk for User Sign Up
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (details: { name: string; email: string; password: string }, { rejectWithValue } : any) => {
    try {
      const response : any = await api.post('/sign_up', details);
      localStorage.setItem('jwt_token', response.data.jwt_token);
      return response.data.jwt_token;
    } catch (error: any) {
      return rejectWithValue(error.response.data.reason || 'Sign up failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state : any) => {
      localStorage.removeItem('jwt_token');
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder : any) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state : any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state : any, action: PayloadAction<string>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state : any, action : any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Sign Up cases
      .addCase(signUpUser.pending, (state : any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state : any, action: PayloadAction<string>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload;
      })
      .addCase(signUpUser.rejected, (state : any, action : any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
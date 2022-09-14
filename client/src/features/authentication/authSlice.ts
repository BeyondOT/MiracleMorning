import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserLogin, UserRegister } from "./auth.types";

import * as authAPI from "./authAPI";

export interface AuthState {
  token: string;
  loading: boolean;
  errors: boolean;
}

const initialState: AuthState = {
  token:"",
  loading: false,
  errors: false,
};

export const getToken = createAsyncThunk("user/fetchToken", async () => {
  const res = await authAPI.fetchToken(); // The value we return becomes the `fulfilled` action payload
  return res.data;
});

export const register = createAsyncThunk(
  "user/register",
  async (data: UserRegister) => {
    const res = await authAPI.register(data);
    return res.data;
  }
);

export const signIn = createAsyncThunk(
  "user/login",
  async (data: UserLogin) => {
    const res = await authAPI.login(data);
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // sign in
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.errors = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(signIn.rejected, (state) => {
        state.loading = false;
        state.errors = true;
      })
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      // Token reducers
      .addCase(getToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(getToken.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "../../app/store";
import { UserLogin, UserLoginErrors, UserRegister, UserRegisterErrors } from "./auth.types";

import * as authAPI from "./authAPI";

export interface AuthState {
  token: string;
  loading: boolean;
  errors: SerializedError;
}

const initialState: AuthState = {
  token: "",
  loading: false,
  errors: {} as SerializedError,
};

export const getToken = createAsyncThunk("auth/fetchToken", async () => {
  const res = await authAPI.fetchToken(); // The value we return becomes the `fulfilled` action payload
  return res.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await authAPI.logout(); // The value we return becomes the `fulfilled` action payload
  return res.data;
});

export const register = createAsyncThunk(
  "auth/register",
  async (data: UserRegister, { rejectWithValue }) => {
    try {
      const res = await authAPI.register(data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data as UserRegisterErrors);
      } else {
        return rejectWithValue({
          name: "Unexcpected Error",
          message: "An Unexpected error occured",
        });
      }
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/login",
  async (data: UserLogin, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data as UserLoginErrors);
      } else {
        return rejectWithValue({
          name: "Unexcpected Error",
          message: "An Unexpected error occured",
        });
      }
    }
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
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
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
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = "";
      })
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

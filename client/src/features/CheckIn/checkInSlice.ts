import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "./checkIn.types";

import * as checkInAPI from "./checkInAPI";

export interface CheckInState {
  user: User;
  loading: boolean;
  errors: boolean;
}

const initialState: CheckInState = {
  user: {} as User,
  loading: true,
  errors: false,
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  const res = await checkInAPI.getUser(); // The value we return becomes the `fulfilled` action payload
  return res.data;
});

export const checkIn = createAsyncThunk(
  "user/checkIn",
  async () => {
    const res = await checkInAPI.checkIn();
    return res.data;
  }
);

export const checkInSlice = createSlice({
  name: "checkIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // sign in
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.errors = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.errors = true;
      })
      // register
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkIn.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const selectCheckIn = (state: RootState) => state.checkIn;

export default checkInSlice.reducer;
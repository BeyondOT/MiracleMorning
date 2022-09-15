import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from "../features/authentication/authSlice"
import checkInReducer from '../features/CheckIn/checkInSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    checkIn: checkInReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

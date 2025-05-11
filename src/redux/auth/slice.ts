import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  type User,
  signUp,
  signIn,
  signOut,
  refreshUser,
  fetchCurrentUser,
} from "./operations";

type AuthState = {
  user: { _id: string; name: string; email: string } | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const handlePending = (state: AuthState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: AuthState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload ?? "Something went wrong";
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, handlePending)
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signIn.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = false;
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isRefreshing = false;
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload ?? "Failed to refresh user";
        state.isLoggedIn = false;
        state.token = null;
        state.refreshToken = null;
        state.user = null;
      })
      .addCase(signOut.pending, handlePending)
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(signOut.rejected, handleRejected)
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.user = {
            _id: action.payload._id,
            name: action.payload.name,
            email: action.payload.email,
          };
          state.isLoggedIn = true;
          state.error = null;
        }
      )
      .addCase(fetchCurrentUser.rejected, handleRejected);
  },
});
export const { resetAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;

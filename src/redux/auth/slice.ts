import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type User, signUp, signIn, signOut, refreshUser } from "./operations";

type AuthState = {
  user: { name: string; email: string } | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  error: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = { name: action.payload.name, email: action.payload.email };
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, handlePending)
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = { name: action.payload.name, email: action.payload.email };
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signIn.rejected, handleRejected)
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(refreshUser.rejected, handleRejected)
      .addCase(signOut.pending, handlePending)
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(signOut.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;

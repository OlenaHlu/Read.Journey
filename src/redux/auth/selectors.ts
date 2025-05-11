import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectError = (state: RootState) => state.auth.error;

export const selectIsRefreshingToken = (state: RootState) =>
  state.auth.isRefreshing;

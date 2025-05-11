import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectLibraryState = (state: RootState) => state.library;

export const selectUserBooks = createSelector(
  [selectLibraryState, (state: RootState, userId: string) => userId],
  (library, userId) => library.usersBooks[userId] || []
);

export const selectLoadingLibrary = (state: RootState) =>
  state.library.isLoading;

export const selectErrorLibrary = (state: RootState) => state.library.error;

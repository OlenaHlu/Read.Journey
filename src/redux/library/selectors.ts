import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectLibraryState = (state: RootState) => state.library;
export const selectFiltersLib = (state: RootState) => state.books.filtersLib;

export const selectUserBooks = createSelector(
  [
    selectLibraryState,
    selectFiltersLib,
    (state: RootState, userId: string) => userId,
  ],
  (library, filtersLib, userId) => {
    if (!userId || !library.usersBooks[userId]) {
      return [];
    }

    const userBooks = library.usersBooks[userId];

    if (filtersLib === "All books") {
      return userBooks;
    }

    return userBooks.filter(
      (book) => book.status === filtersLib.toLowerCase().replace(" ", "")
    );
  }
);

export const selectLoadingLibrary = (state: RootState) =>
  state.library.isLoading;

export const selectErrorLibrary = (state: RootState) => state.library.error;

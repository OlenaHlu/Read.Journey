import { RootState } from "../store";

export const selectBooks = (state: RootState) => state.books;

export const selectIsLoading = (state: RootState) => state.books.isLoading;

export const selectError = (state: RootState) => state.books.error;

import { RootState } from "../store";
import { Book } from "./types";

export const selectBooks = (state: RootState): Book[] => state.books.books;

export const selectCurrentPage = (state: RootState) => state.books.currentPage;

export const selectTotalPages = (state: RootState) => state.books.totalPages;

export const selectPerPage = (state: RootState) => state.books.perPage;

export const selectFiltersLib = (state: RootState) => state.books.filtersLib;

export const selectInputFilters = (state: RootState) =>
  state.books.inputFilters;

export const selectFavoritesBook = (state: RootState) =>
  state.books.favoriteBooks;

export const selectReadingBook = (state: RootState) => state.books.readingBook;

export const selectIsLoading = (state: RootState) => state.books.isLoading;

export const selectError = (state: RootState) => state.books.error;

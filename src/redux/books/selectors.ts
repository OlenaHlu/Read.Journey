import { RootState } from "../store";

export const selectBooks = (state: RootState) => state.books;

export const selectCurrentPage = (state: RootState) => state.books.currentPage;

export const selectTotalPages = (state: RootState) => state.books.totalPages;

export const selectPerPage = (state: RootState) => state.books.perPage;

export const selectFilters = (state: RootState) => state.books.filters;

export const selectIsLoading = (state: RootState) => state.books.isLoading;

export const selectError = (state: RootState) => state.books.error;

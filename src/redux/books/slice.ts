import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBooks } from "./operations";
import { BooksState, BooksResponse, Book } from "./types";

const initialState: BooksState = {
  books: [],
  currentPage: 1,
  perPage: 5,
  totalPages: 0,
  filters: "All books",
  isLoading: false,
  error: null,
};

const handlePending = (state: BooksState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: BooksState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload ?? "Something went wrong";
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    resetPage(state) {
      state.currentPage = 1;
    },
    incrementPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    decrementPage(state) {
      state.currentPage = Math.max(1, state.currentPage - 1);
    },
    setPerPage(state, action) {
      state.perPage = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    resetFilters(state) {
      state.filters = "All books";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, handlePending)
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<BooksResponse>) => {
          state.isLoading = false;
          state.books = action.payload.results;
          state.totalPages = action.payload.totalPages;
          state.error = null;
        }
      )
      .addCase(fetchBooks.rejected, handleRejected);
  },
});

export const {
  resetPage,
  incrementPage,
  decrementPage,
  setPerPage,
  setFilters,
  resetFilters,
} = booksSlice.actions;
export const booksReducer = booksSlice.reducer;

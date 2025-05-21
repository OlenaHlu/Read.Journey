import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBooks } from "./operations";
import { BooksState, BooksResponse } from "../types";

const initialState: BooksState = {
  books: [],
  book: {
    _id: "",
    title: "",
    author: "",
    imageUrl: "",
    totalPages: 0,
    recommend: false,
  },
  currentPage: 1,
  perPage: 10,
  totalPages: 0,
  filtersLib: "All books",
  inputFilters: {
    title: "",
    author: "",
  },
  readingBook: null,
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
    setFiltersLib(state, action) {
      state.filtersLib = action.payload;
      state.currentPage = 1;
    },
    resetFiltersLib(state) {
      state.filtersLib = "All books";
      state.currentPage = 1;
    },
    setInputFilters(state, action) {
      state.inputFilters = action.payload;
    },
    resetInputFilters(state) {
      state.inputFilters = {
        title: "",
        author: "",
      };
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
  setFiltersLib,
  resetFiltersLib,
  setInputFilters,
  resetInputFilters,
} = booksSlice.actions;
export const booksReducer = booksSlice.reducer;

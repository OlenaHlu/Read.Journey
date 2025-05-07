import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBooks, fetchBookById } from "./operations";
import { BooksState, BooksResponse, BookIdResponse, Book } from "./types";

const initialState: BooksState = {
  books: [],
  book: {
    _id: "",
    title: "",
    author: "",
    imageUrl: "",
    totalPages: 0,
    status: "",
    owner: "",
    progress: [],
    timeLeftToRead: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  },
  favoriteBooks: [] as Book[],
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
    },
    resetFiltersLib(state) {
      state.filtersLib = "All books";
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
    addToLibrary(state, action: PayloadAction<Book>) {
      const bookToAdd = action.payload;
      const isBookAlreadyInLibrary = state.favoriteBooks.some(
        (book) => book._id === bookToAdd._id
      );
      if (!isBookAlreadyInLibrary) {
        state.favoriteBooks.push(bookToAdd);
      }
    },
    removeFromLibrary(state, action: PayloadAction<string>) {
      state.favoriteBooks = state.favoriteBooks.filter(
        (book) => book._id !== action.payload
      );
    },
    setReadingBook: (state, action: PayloadAction<Book>) => {
      state.readingBook = action.payload;
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
      .addCase(fetchBooks.rejected, handleRejected)
      .addCase(fetchBookById.pending, handlePending)
      .addCase(
        fetchBookById.fulfilled,
        (state, action: PayloadAction<BookIdResponse>) => {
          state.isLoading = false;
          state.book = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchBookById.rejected, handleRejected);
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
  addToLibrary,
  removeFromLibrary,
  setReadingBook,
} = booksSlice.actions;
export const booksReducer = booksSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBooks } from "./operations";
import { type BooksResponse } from "./types";

type BooksState = {
  books: BooksResponse | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: BooksState = {
  books: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, handlePending)
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<BooksResponse>) => {
          state.isLoading = false;
          state.books = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchBooks.rejected, handleRejected);
  },
});

export const booksReducer = booksSlice.reducer;

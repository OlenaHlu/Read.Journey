import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addBooks, removeBook } from "./operations";
import { AddBooksId } from "../types";

type LibraryState = {
  usersBooks: Record<string, AddBooksId[]>;
  isLoading: boolean;
  error: string | null;
};

const initialState: LibraryState = {
  usersBooks: {},
  isLoading: false,
  error: null,
};

const handlePending = (state: LibraryState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: LibraryState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload ?? "Something went wrong";
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBooks.pending, handlePending)
      .addCase(addBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        const userId = action.payload.owner;
        if (!state.usersBooks[userId]) {
          state.usersBooks[userId] = [];
        }
        const bookIdToAdd = action.meta.arg.bookId;
        const isBookAlreadyAdded = state.usersBooks[userId].some(
          (bookInLibrary) => bookInLibrary._id === action.payload._id
        );
        if (!isBookAlreadyAdded) {
          const newBookInLibrary = { ...action.payload, bookId: bookIdToAdd };
          state.usersBooks[userId].push(newBookInLibrary);
        } else {
          console.log(
            `Книга з bookId ${bookIdToAdd} вже є в бібліотеці користувача ${userId}`
          );
        }
      })
      .addCase(addBooks.rejected, handleRejected)

      //delete book;
      .addCase(removeBook.pending, handlePending)
      .addCase(removeBook.fulfilled, (state, action) => {
        state.isLoading = false;
        const bookIdToRemove = action.meta.arg.id;
        const userId = state.usersBooks
          ? Object.keys(state.usersBooks).find((key) =>
              state.usersBooks[key].some((book) => book._id === bookIdToRemove)
            )
          : undefined;

        if (userId && state.usersBooks[userId]) {
          state.usersBooks[userId] = state.usersBooks[userId].filter(
            (book) => book._id !== bookIdToRemove
          );
        }
      })
      .addCase(removeBook.rejected, handleRejected);
  },
});

export const libraryReducer = librarySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type addBooksId, addBooks, removeBook } from "./operations";

type LibraryState = {
  usersBooks: Record<string, addBooksId[]>;
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
      .addCase(
        addBooks.fulfilled,
        (state, action: PayloadAction<addBooksId>) => {
          state.isLoading = false;
          const userId = action.payload.owner;
          if (!state.usersBooks[userId]) {
            state.usersBooks[userId] = [];
          }
          state.usersBooks[userId].push(action.payload);
        }
      )
      .addCase(addBooks.rejected, handleRejected)

      //delete book;
      .addCase(removeBook.pending, handlePending)
      .addCase(removeBook.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        const userId = action.payload;
        if (state.usersBooks[userId]) {
          state.usersBooks[userId] = state.usersBooks[userId].filter(
            (book) => book._id !== action.payload
          );
        }
      })
      .addCase(removeBook.rejected, handleRejected);
  },
});

export const libraryReducer = librarySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startReadingBook, finishReadingBook } from "./operations";
import {
  StartReadBook,
  FinishReadBook,
  AddBooksId,
  Book,
  Progress,
} from "../types";

type ReadingState = {
  startReadingPage: number | null;
  currentPage: number | null;
  currentReadingBook: (AddBooksId & Partial<Book>) | null;
  isReadingStarted: boolean;
  isReadingActive: boolean;
  stopReadingPage: number | null;
  progress: Progress[];
  timeLeftToRead: {
    hours: number | null;
    minutes: number | null;
    seconds: number | null;
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: ReadingState = {
  startReadingPage: null,
  currentPage: null,
  currentReadingBook: null,
  isReadingStarted: false,
  isReadingActive: false,
  stopReadingPage: null,
  progress: [] as Progress[],
  timeLeftToRead: {
    hours: null,
    minutes: null,
    seconds: null,
  },
  isLoading: false,
  error: null,
};

const handlePending = (state: ReadingState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: ReadingState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload ?? "Something went wrong";
};

const resetReadingState = {
  startReadingPage: null,
  currentPage: null,
  isReadingStarted: false,
  isReadingActive: false,
  stopReadingPage: null,
  progress: [] as Progress[],
  timeLeftToRead: initialState.timeLeftToRead,
};

const readingSlice = createSlice({
  name: "reading",
  initialState: initialState,
  reducers: {
    setReadingBook: (state, action: PayloadAction<AddBooksId | null>) => {
      state.currentReadingBook = action.payload ? action.payload : null;
      Object.assign(state, resetReadingState);
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    clearReadingBook: (state) => {
      state.currentReadingBook = null;
      Object.assign(state, resetReadingState);
    },

    setIsReadingActive: (state, action: PayloadAction<boolean>) => {
      state.isReadingActive = action.payload;
    },

    setStopReadingPage: (state, action: PayloadAction<number | null>) => {
      state.stopReadingPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startReadingBook.pending, handlePending)
      .addCase(
        startReadingBook.fulfilled,
        (state, action: PayloadAction<StartReadBook>) => {
          state.isLoading = false;
          state.isReadingStarted = true;
          state.isReadingActive = true;

          const startPage = action.payload.progress[0]?.startPage || null;

          state.startReadingPage = startPage;
          state.currentPage = startPage;

          state.progress = action.payload.progress;

          const lastProgress = state.progress[state.progress.length - 1];
          if (!lastProgress || lastProgress.status !== "active") {
            state.progress.push({
              startPage: startPage || 0,
              startReading:
                action.payload.progress[0]?.startReading ||
                new Date().toISOString(),
              status: "active",
            });
          }
        }
      )
      .addCase(startReadingBook.rejected, handleRejected)
      .addCase(finishReadingBook.pending, handlePending)
      .addCase(
        finishReadingBook.fulfilled,
        (state, action: PayloadAction<FinishReadBook>) => {
          state.isLoading = false;
          state.isReadingStarted = false;
          state.isReadingActive = false;
          state.currentReadingBook = null;

          state.progress = action.payload.progress;

          state.timeLeftToRead = {
            hours: action.payload.timeLeftToRead?.hours || null,
            minutes: action.payload.timeLeftToRead?.minutes || null,
            seconds: action.payload.timeLeftToRead?.seconds || null,
          };

          const lastReadSession =
            action.payload.progress[action.payload.progress.length - 1];
          state.currentPage = lastReadSession?.finishPage || null;
          state.startReadingPage = null;
          state.stopReadingPage = null;
        }
      );
  },
});

export const {
  setReadingBook,
  setCurrentPage,
  clearReadingBook,
  setIsReadingActive,
  setStopReadingPage,
} = readingSlice.actions;

export const readingReducer = readingSlice.reducer;

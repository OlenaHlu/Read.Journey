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
const readingSlice = createSlice({
  name: "reading",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startReadingBook.pending, handlePending)
      .addCase(
        startReadingBook.fulfilled,
        (state, action: PayloadAction<StartReadBook>) => {
          state.isLoading = false;
          state.isReadingStarted = true;

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
        }
      );
  },
});

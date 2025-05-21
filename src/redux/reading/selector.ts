import { RootState } from "../store";
import { type AddBooksId } from "../types";

export const selectCurrentReadingBook = (state: RootState): AddBooksId | null =>
  state.reading.currentReadingBook;
export const selectStartReadingPage = (state: RootState) =>
  state.reading.startReadingPage;
export const selectCurrentPage = (state: RootState) =>
  state.reading.currentPage;
export const selectProgress = (state: RootState) => state.reading.progress;
export const selectTimeLeftToRead = (state: RootState) =>
  state.reading.timeLeftToRead;
export const selectReadingIsLoading = (state: RootState) =>
  state.reading.isLoading;
export const selectReadingError = (state: RootState) => state.reading.error;
export const selectIsReadingActive = (state: RootState) =>
  state.reading.isReadingActive;
export const selectStopReadingPage = (state: RootState) =>
  state.reading.stopReadingPage;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startReadingBook, finishReadingBook } from "./operations";
import {
  StartReadBook,
  FinishReadBook,
  Progress,
  TimeLeftToRead,
} from "../types";

type ReadingState = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: string;
  owner: string;
  progress: Progress[];
  timeLeftToRead: TimeLeftToRead;
  isLoading: boolean;
  error: string | null;
};

const initialState: ReadingState = {
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

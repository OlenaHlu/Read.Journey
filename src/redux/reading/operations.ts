import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { type StartReadBook, type FinishReadBook } from "../types";

export const startReadingBook = createAsyncThunk<
  StartReadBook,
  { id: string; page: number },
  { rejectValue: string }
>("reading/startReadingBook", async ({ id, page }, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/books/reading/start", {
      id,
      page,
    });
    return response.data;
  } catch (error: any) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to start reading book");
  }
});

export const finishReadingBook = createAsyncThunk<
  FinishReadBook,
  { id: string; page: number },
  { rejectValue: string }
>("reading/finishReadingBook", async ({ id, page }, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/books/reading/finish", {
      id,
      page,
    });
    return response.data;
  } catch (error: any) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to finish reading book");
  }
});

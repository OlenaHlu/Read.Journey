import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { type BooksResponse } from "./types";

export const fetchBooks = createAsyncThunk<
  BooksResponse,
  void,
  { rejectValue: string }
>("/books/fetchBooks", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/books/recommend");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to fetch books");
  }
});

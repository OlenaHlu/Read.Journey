import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { type BooksResponse } from "./types";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api/";

export const fetchBooks = createAsyncThunk<
  BooksResponse,
  void,
  { rejectValue: string }
>("/books/fetchBooks", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/books/recommend");
    console.log("Response data from Firebase:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to fetch books");
  }
});

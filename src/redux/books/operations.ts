import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { type BooksResponse, BookIdResponse } from "./types";

export const fetchBooks = createAsyncThunk<
  BooksResponse,
  {
    page: number;
    limit: number;
    inputFilters: { title: string; author: string };
  },
  { rejectValue: string }
>("/books/fetchBooks", async ({ page, limit, inputFilters }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(
      `/books/recommend?page=${page}&limit=${limit}&title=${inputFilters.title}&author=${inputFilters.author}`
    );
    console.log("Response data from Firebase:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to fetch books");
  }
});

export const fetchBookById = createAsyncThunk<
  BookIdResponse,
  { rejectValue: string }
>("/books/fetchBookById", async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
    console.log("Response data from Firebase:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to fetch book by ID");
  }
});

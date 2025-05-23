import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { AddBooksId } from "../types";

export const addBooks = createAsyncThunk<
  AddBooksId,
  { userId: string; bookId: string },
  { rejectValue: string }
>("/library/addBook", async ({ userId, bookId }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/books/add/${bookId}`, {
      userId,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
  return thunkAPI.rejectWithValue("Failed to add book");
});

export const removeBook = createAsyncThunk<
  string,
  { id: string },
  { rejectValue: string }
>("/library/deleteBook", async ({ id }, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/books/remove/${id}`);
    return response.data.message || "Book removed successfully";
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to remove book");
  }
});

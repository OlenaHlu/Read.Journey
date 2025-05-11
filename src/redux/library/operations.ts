import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export type addBooksId = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: string;
  owner: string;
  progress: [];
  recommend?: boolean;
  bookId?: string;
};

export const addBooks = createAsyncThunk<
  addBooksId,
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
  { bookId: string },
  { rejectValue: string }
>("/library/deleteBook", async ({ bookId }, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/books/remove/${bookId}`);
    return response.data.message || "Book removed successfully";
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to remove book");
  }
});

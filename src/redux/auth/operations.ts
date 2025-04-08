import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export type User = {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
};

export const signUp = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("/users/signUp", async ({ name, email, password }, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/users/signup", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
  return thunkAPI.rejectWithValue("Registration failed");
});

export const signIn = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("/users/signIn", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/users/signin", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
  return thunkAPI.rejectWithValue("Login failed");
});

export const refreshUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("/users/current/refreshUser", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/users/current/refresh");
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to refresh user data");
  }
});

export const signOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "/users/signOut",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post("/users/signout");
      localStorage.removeItem("token");
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

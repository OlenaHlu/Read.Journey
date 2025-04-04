import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api/";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

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
    const response = await axios.post("/users/signup", {
      name,
      email,
      password,
    });
    setAuthHeader(response.data.token);
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
    const response = await axios.post("/users/signin", { email, password });
    setAuthHeader(response.data.token);
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
    const response = await axios.get("/users/current/refresh");
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to refresh user data");
  }
});

export const signOut = createAsyncThunk<void, { rejectValue: string }>(
  "/users/signOut",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/logout");
      clearAuthHeader();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export type User = {
  _id: string;
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
    const response = await axiosInstance.post<User>("/users/signup", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    console.log("signUp fulfilled response.data:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("signUp rejected error:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
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

    console.log("signIn fulfilled response.data:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("signIn rejected error:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Login failed"
    );
  }
});

export const refreshUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("/users/current/refreshUser", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token available");
    }

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
      console.error("Error logging out", error);
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("/users/current", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get<User>("/users/current");
    console.log("fetchCurrentUser fulfilled response.data:", response.data);
    return response.data;
  } catch (error: any) {
    console.log("fetchCurrentUser rejected error:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch current user info"
    );
  }
});

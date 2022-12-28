import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch, { setToken } from "../utils/apiGet";

export const getLogin = createAsyncThunk(
  "user/getLogin",
  async (userData, { rejectWithValue }) => {
    console.log(userData);
    try {
      const res = await customFetch.post("/user/login", userData);
      localStorage.setItem("token", res.data.data.user.token);
      setToken("token", res.data.data.user.token);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.res.message);
      return rejectWithValue(error.res.message);
    }
  }
);

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
  isLogin: localStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutUser: (state) => {
      localStorage.clear();
      state.isLogin = false;
      toast("Logout Successfully");
    },
  },
  extraReducers: {
    // register user
    [getLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getLogin.fulfilled]: (state, { payload }) => {
      state.userInfo=payload
      if (payload.status === 200) {
        state.loading = false;
        state.isLogin = true;
        toast("Welcome To Admin Panel");
        state.success = true; // registration successful
      }
    },
    [getLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logOutUser } = authSlice.actions;
export default authSlice.reducer;

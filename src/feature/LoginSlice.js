import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch, { setToken } from "../utils/apiGet";


export const getLogin = createAsyncThunk(
  "user/getUserLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await customFetch.post("/user/login", userData);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem('userFirst', res.data.data.first_name);
      localStorage.setItem('userLast', res.data.data.last_name);
      localStorage.setItem('email', res.data.data.email);
      setToken(res.data.data.token);
      return res.data;
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.Error);
      return rejectWithValue(err.res.data.data);
    }
  }
);

const initialState = {
  loading: false,
  userFirstName: localStorage.getItem('userFirst') ? localStorage.getItem('userFirst') : null,
  userLastName: localStorage.getItem('userLast') ? localStorage.getItem('userLast') : null,
  email: localStorage.getItem('email') ? localStorage.getItem('email') : null,
  error: null,
  success: false,
  isLogin: localStorage.getItem('token') ? true : false,
};

const LoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      localStorage.clear();
      state.isLogin = false;
      state.userFirstName = null;
      state.userLastName = null;
      state.email = null;
      toast("Logout Successfully")
    },
  },
  extraReducers: {
    [getLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getLogin.fulfilled]: (state, { payload }) => {
      console.log(payload)
      if (payload.status === 200) {
        const { first_name, last_name, email } = payload.data;
        state.userFirstName = first_name;
        state.userLastName = last_name;
        state.email = email;
        state.loading = false;
        state.isLogin = true;
        toast("Welcome To Admin Panel")
      }
    },
    [getLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { logOutUser } = LoginSlice.actions;
export default LoginSlice.reducer;

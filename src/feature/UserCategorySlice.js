import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/apiGet";

export const getUserCategory = createAsyncThunk(
  "userCategory/getUserCategory",
  async () => {
    try {
      const res = await customFetch.get("/user/categoryList");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);


const initialState = {
  status: null,
  userCategory: [],
};

const userCategorySlice = createSlice ({
    name:"userCategory",
    initialState,
    reducers:{},
    extraReducers:{
        [getUserCategory.pending]:(state,action)=>{
            state.status="loading..."
        },
        [getUserCategory.fulfilled]:(state,action)=>{
            state.status = "success"
            state.userCategory= action.payload
        },
        [getUserCategory.rejected]:(state,action)=>{
            state.status= "error"
        }
    }
})


export default userCategorySlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/apiGet";

export const getUserProductList = createAsyncThunk(
  "userCategory/getUserProductList",
  async (id) => {
    console.log(id)
    try {
      const res = await customFetch.get(`user/productList?category_id=${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);


const initialState = {
  status: null,
  userproductList: [],
  productListID:null
};

const UserProductListSlice = createSlice ({
    name:"userproductList",
    initialState,
    reducers:{
      setProductListID:(state,action)=>{
        console.log(action)
        state.productListID = action.payload
      }
    },
    extraReducers:{
        [getUserProductList.pending]:(state,action)=>{
            state.status="loading..."
        },
        [getUserProductList.fulfilled]:(state,action)=>{
            state.status = "success"
            state.userproductList= action.payload
        },
        [getUserProductList.rejected]:(state,action)=>{
            state.status= "error"
        }
    }
})

export const {setProductListID} = UserProductListSlice.actions
export default UserProductListSlice.reducer
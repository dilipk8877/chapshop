import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/apiGet";

export const getProductDeatils = createAsyncThunk("productDetail/getProductDeatils", async(id)=>{
    try{
        const res= await customFetch.get(`/user/getProduct/${id}`)
        return res.data
    }catch(error){
        console.log(error);
    }
})
const initialState = {
    proDetails:[],
    status:null
}
const userProductDetailSlice = createSlice({
    name:"proDetails",
    initialState,
    extraReducers:{
        [getProductDeatils.pending]:(state,action)=>{
            state.status = "loading..."
        },
        [getProductDeatils.fulfilled]:(state,action)=>{
            state.status = "success"
            state.proDetails = action.payload
        },
        [getProductDeatils.rejected]:(state,action)=>{
            state.status = "error"
        }
    }
})

export default userProductDetailSlice.reducer
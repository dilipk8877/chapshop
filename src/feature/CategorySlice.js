import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch, { setToken } from "../utils/apiGet";


export const getCategoryList = createAsyncThunk("categoryList/getCategoryList",async()=>{
    try{
        const res = await customFetch.get("/category/categoryList")
        console.log(res.data)
        return res.data
    }catch(error){
        console.log(error);
    }
})

export const addCategoryList = createAsyncThunk("addCategory/getCategoryList",async(data,thunkAPI)=>{
    try{
        const res = await customFetch.post("/category/addCategory",data)
        thunkAPI.dispatch(getCategoryList(data))
        return res.data
    }catch(error){
        console.log(error);
    }
})

const initialState ={
    status:null,
    category:[]
}

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:{
        [getCategoryList.pending]:(state,action)=>{
            state.status="loading"
        },
        [getCategoryList.fulfilled]:(state,action)=>{
            console.log(action);
            state.status="success"
            state.category= action.payload
        },
        [getCategoryList.pending]:(state,action)=>{
            state.status="error"
        },
    }
})

export default categorySlice.reducer
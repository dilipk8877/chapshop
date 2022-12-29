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
    console.log(data.items)
    try{
        let fData = new FormData();
        fData.append("category_image",data.category_image)
    fData.append("category_name", data.category_name);
    data.items.forEach(item => fData.append("sizes[]", item));
        const res = await customFetch.post("/category/addCategory",fData)
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
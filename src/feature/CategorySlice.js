import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/apiGet";

export const getCategoryList = createAsyncThunk(
  "categoryList/getCategoryList",
  async () => {
    try {
      const res = await customFetch.get("/category/categoryList");
    
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addCategoryList = createAsyncThunk(
  "addCategory/getCategoryList",
  async (datas, thunkAPI) => {
    const {category_name,items,fieldImage} = datas

    try {
      let fData = new FormData();
      fieldImage.forEach((image)=>fData.append("category_image",image,image.name))
      fData.append("category_name", category_name);
      items.forEach((item) => fData.append("sizes[]", item.name));
      const res = await customFetch.post("/category/addCategory", fData);
      thunkAPI.dispatch(getCategoryList());
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editCategory = createAsyncThunk("edit/getCategoryList",async(data,thunkAPI)=>{
    const {category_id,category_name,items,fieldImage} = data
    try{
        let fData = new FormData();
        fData.append("category_image",fieldImage,fieldImage.name);
        fData.append("category_name", category_name);
        items.forEach((item) => fData.append("sizes[]", item.name));
        fData.append("category_id", category_id._id);
        const res = await customFetch.put("/category/updateCategory", fData);
        thunkAPI.dispatch(getCategoryList(data));
        return res.data;
    }catch(error){
        console.log(error)
    }
})

export const deleteCategory = createAsyncThunk("delete/getCategoryList",async(id,thunkAPI)=>{
    try{
        const res  = await customFetch.delete(`/category/deleteCategory/${id}`)
        thunkAPI.dispatch(getCategoryList(id))
        toast.success("Successfully delete Category")
        return res.data
    }catch(error){
        console.log(error);
    }
})

const initialState = {
  status: null,
  category: [],
  category_id:null,
  toggleState: true,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryId:(state,action)=>{
        state.category_id = action.payload
    },
    setTogglePromo: (state, action) => {
        state.toggleState = false;
      },
      setToggleFalse: (state, action) => {
        state.toggleState = true;
      },
  },
  extraReducers: {
    [getCategoryList.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCategoryList.fulfilled]: (state, action) => {
      state.status = "success";
      state.category = action.payload;
    },
    [getCategoryList.pending]: (state, action) => {
      state.status = "error";
    },
  },
});
export const {setCategoryId,setTogglePromo,setToggleFalse} = categorySlice.actions
export default categorySlice.reducer;

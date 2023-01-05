import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/apiGet";

export const getProductList = createAsyncThunk(
  "product/getProduct",
  async () => {
    try {
      const res = await customFetch.get("/product/productList");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "addProduct/getProductList",
  async (data, thunkAPI) => {
    console.log(data);
    const {
      buying_price,
      category_id,
      mainImage,
      product_name,
      reselling_price,
      sharingImages,
      sizes,
      sku,
    } = data;
    try {
      let fData = new FormData();
      mainImage.forEach((image) =>
        fData.append("mainImage", image, image.name)
      );
      sharingImages.forEach((image) =>
        fData.append("sharingImages", image, image.name)
      );
      fData.append("product_name", product_name);
      fData.append("buying_price", buying_price);
      fData.append("reselling_price", reselling_price);
      fData.append("sku", sku);
      fData.append("category_id", category_id);
      sizes.forEach((item) => fData.append("sizes[]", item));
      const res = await customFetch.post("product/addProduct", fData);
      thunkAPI.dispatch(getProductList(data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProductList = createAsyncThunk(
  "edit/getProductList",
  async (data, thunkAPI) => {
    console.log(data.product_id.id)
    const {
      buying_price,
      category_id,
      mainImage,
      product_name,
      reselling_price,
      sharingImages,
      sizes,
      sku,
      product_id
    } = data;
    try {
      let fData = new FormData();
      mainImage.forEach((image) =>
        fData.append("mainImage", image, image.name)
      );
      sharingImages.forEach((image) =>
        fData.append("sharingImages", image, image.name)
      );
      fData.append("product_name", product_name);
      fData.append("buying_price", buying_price);
      fData.append("reselling_price", reselling_price);
      fData.append("sku", sku);
      fData.append("product_id", product_id.id);
      fData.append("category_id", category_id);
      sizes.forEach((item) => fData.append("sizes[]", item));
      const res = await customFetch.put("product/updateProduct", fData);
      console.log(fData)
      thunkAPI.dispatch(getProductList(data))
      return res.data
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "delete/getProductList",
  async (id, thunkAPI) => {
    try {
      const res = await customFetch.delete(`product/deleteProduct/${id}`);
      thunkAPI.dispatch(getProductList());
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  status: null,
  product: [],
  product_id: null,
  toggleProductForm: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductId: (state, action) => {
      console.log(action.payload);
      state.product_id = action.payload;
    },
    setToggleProductFormFalse: (state, action) => {
      state.toggleProductForm = false;
    },
    setToggleProductFormTrue: (state, action) => {
      state.toggleProductForm = true;
    },
  },
  extraReducers: {
    [getProductList.pending]: (state, action) => {
      state.status = "loading...";
    },
    [getProductList.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = "success";
    },
    [getProductList.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});
export const {
  setProductId,
  setToggleProductFormTrue,
  setToggleProductFormFalse,
} = productSlice.actions;
export default productSlice.reducer;

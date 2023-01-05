import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/LoginSlice"
import categorySlice from "./feature/CategorySlice"
import ProductSlice from "./feature/ProductSlice";
const store = configureStore({
    reducer:{
      auth:authSlice,
      categories:categorySlice,
      products:ProductSlice
    }
  })

export default store
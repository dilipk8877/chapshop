import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/LoginSlice"
import categorySlice from "./feature/CategorySlice"
const store = configureStore({
    reducer:{
      auth:authSlice,
      categories:categorySlice
    }
  })

export default store
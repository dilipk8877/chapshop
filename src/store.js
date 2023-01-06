import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/LoginSlice"
import categorySlice from "./feature/CategorySlice"
import ProductSlice from "./feature/ProductSlice";
import UserCategorySlice from "./feature/UserCategorySlice";
import UserProductListSlice from "./feature/UserProductListSlice"
const store = configureStore({
    reducer:{
      auth:authSlice,
      categories:categorySlice,
      products:ProductSlice,
      userCategories:UserCategorySlice,
      userProductList: UserProductListSlice
    }
  })

export default store
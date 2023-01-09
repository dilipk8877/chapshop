import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/LoginSlice"
import categorySlice from "./feature/CategorySlice"
import ProductSlice from "./feature/ProductSlice";
import UserCategorySlice from "./feature/UserCategorySlice";
import UserProductListSlice from "./feature/UserProductListSlice"
import userProductDetailSlice from "./feature/UserProductDetails"
const store = configureStore({
    reducer:{
      auth:authSlice,
      categories:categorySlice,
      products:ProductSlice,
      userCategories:UserCategorySlice,
      userProductList: UserProductListSlice,
      userProductDetail: userProductDetailSlice
    }
  })

export default store
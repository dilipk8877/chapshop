import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./feature/CombineReducer";
import LoginSlice from "./feature/LoginSlice";

const store = configureStore({
    reducer: rootReducer
  })

export default store
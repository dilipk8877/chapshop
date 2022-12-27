import { combineReducers } from "redux";
import LoginSlice from "./LoginSlice";

const rootReducer = combineReducers({
    userLogin: LoginSlice
})

export default rootReducer
import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Category from "./views/adminPanel/category/Category";
import Product from "./views/adminPanel/product/Product";
import CategoryForm from "./FormPages/categoryForm/categoryForm";
import ProductForm from "./FormPages/productForm/ProductForm";
import LoginPage from "./views/loginPage/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import customFetch, { setToken } from "./utils/apiGet";
import { logOutUser } from "./feature/LoginSlice";
import UserCategory from "./views/userPanel/UserCategory";
import ProductList from "./views/userPanel/ProductList";

const App = () => {
  const {isLogin} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // useEffect(() => {
  //   if(localStorage.getItem('token')) {
  //     setToken(localStorage.getItem('token'))
  //     navigate('/category')
  //   }
  // },[isLogin])

  customFetch.interceptors.response.use(undefined, function axiosR(err){
    if(err.response.status === 401 ) {
      dispatch(logOutUser());
    }
  })
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category_form" element={<CategoryForm />} />
          <Route path="/Product_form" element={<ProductForm />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/UserCategory" element={<UserCategory/>}/>
        <Route path="/productList" element={<ProductList/>}/>
      </Routes>
    </>
  );
};

export default App;

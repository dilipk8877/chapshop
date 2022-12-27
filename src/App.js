import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Category from "./views/category/Category";
import Product from "./views/product/Product";
import CategoryForm from "./pages/categoryForm/categoryForm";
import ProductForm from "./pages/productForm/ProductForm";
import LoginPage from "./views/loginPage/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<ProtectedRoute/>}>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category_form" element={<CategoryForm />} />
          <Route path="/Product_form" element={<ProductForm />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;

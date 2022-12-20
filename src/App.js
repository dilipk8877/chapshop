import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Category from './views/category/Category'
import Product from './views/product/Product'
import AdminPage from './component/AdminPage'
import CategoryForm from './pages/categoryForm/categoryForm'
import ProductForm from './pages/productForm/ProductForm'

const App = () => {
  return (
    <>
    <AdminPage>
    <Routes>
      <Route path='/' element={<Category/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/category_form' element={<CategoryForm/>}/>
      <Route path='/Product_form' element={<ProductForm/>}/>
    </Routes>
    </AdminPage>
    </>
  )
}

export default App
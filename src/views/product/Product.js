import React from 'react'
import { Link } from 'react-router-dom'
const Product = () => {
  return (
    <div>
      <div className='product_header'>
        <p className='product_header'>Products</p>
        <Link className='create_button' to="/product_form">Create New</Link>
      </div>
      <div className='product_search'>
        {/* <DropDown/> */}
        <select className='product-Select-Category' >
          <option value="sd">Select Categoty</option>
          <option value="sd">sdfsd</option>
          <option value="sd">sdfsd</option>
          <option value="sd">sdfsd</option>
          <option value="sd">sdfsd</option>
          <option value="sd">sdfsd</option>
        </select>
        <input type="search" placeholder='Search Here' />
      </div>
    </div>
  )
}

export default Product
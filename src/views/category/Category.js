import React from 'react'
import { Link } from 'react-router-dom'
import BasicTable from '../../pages/reactTable/ReactTable'

const Category = () => {
  return (
    <div className='category_main'>
      <div className='category_header'>
        <p className='category_header'>Categories</p>
        <Link className='create_button' to="/category_form">Create New</Link>
      </div>
      <div className='category_search'>
        <input type="search" placeholder='Search Here' />
      </div>
      <div className='category-main'>
       <BasicTable/>
      </div>
    </div>
  )
}

export default Category
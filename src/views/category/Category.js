import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategoryList } from '../../feature/CategorySlice'
import CategotyTable from '../../pages/reactTable/CategoryTable'

const Category = () => {
  const category = useSelector((store)=>store.categories.category)
  const dispatch = useDispatch()
  console.log(category)
  // const columns = useMemo(() => extractColumn(category.data), []);
   const columns = useMemo(()=>  [
    {
      Header: "Category Name",
      accessor: "category_name",
      Cell: categoryImage=>{
        console.log(categoryImage)
        const imageUrl=`http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/${categoryImage.row.original.category_image?.filename}`;
        // const imageUrl = (URL.createObjectURL(categoryImage))
           // categoryImage.row.original.category_image?.filename
        return (
          <div className="category-name-image">
            <img src={imageUrl} alt="pic"></img>
            <p>{categoryImage.row.original.category_name}</p>
          </div>
        );
            }
    },
    {
      Header: "Sizes",
      accessor: "sizes",
    },
    {
      Header: "Action",
      accessor: "action",
      disableSortBy: true,
      Cell: (tableProps) => {
        return (
          <>
            <button className="category-edit-btn">Edit</button>{" "}
            <button className="category-edit-delete">Delete</button>
          </>
        );
      },
    },
  ],[]);

  useEffect(() => {
    dispatch(getCategoryList())
  }, [dispatch]);
 

  const data = useMemo(() => category?.data, [category]);
  console.log(category?.data)
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
       {category?.data?.length>0 && <CategotyTable
       data={data}
       columns={columns}/>}
      </div>
    </div>
  )
}

export default Category
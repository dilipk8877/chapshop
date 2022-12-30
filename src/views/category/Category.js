import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCategory, editCategory, getCategoryList, setCategoryId, setToggleFalse, setTogglePromo } from '../../feature/CategorySlice'
import CategotyTable from '../../pages/reactTable/CategoryTable'

const Category = () => {
  const category = useSelector((store)=>store.categories.category)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const eidtRowItem = (item)=>{
    dispatch(setCategoryId(item))
    dispatch(setTogglePromo())
    navigate("/category_form")

  }
  // const columns = useMemo(() => extractColumn(category.data), []);
   const columns = useMemo(()=>  [
    {
      Header: "Category Name",
      accessor: "category_name",
      Cell: categoryImage=>{
        const imageUrl=`http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/${categoryImage.row.original.category_image?.filename}`;
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
        console.log(tableProps.row.original._id)
        const rowIdx = tableProps.row.original._id
        return (
          <>
            <button className="category-edit-btn" onClick={()=>eidtRowItem(tableProps.row.original)}>Edit</button>{" "}
            <button className="category-edit-delete" onClick={()=>dispatch(deleteCategory(rowIdx))}>Delete</button>
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
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../../component/Loader'
import { deleteCategory, getCategoryList, setCategoryId, setInitialValue, setTogglePromo } from '../../../feature/CategorySlice'
import { setToggleProductFormTrue } from '../../../feature/ProductSlice'
import CategotyTable from '../../../FormPages/reactTable/CategoryTable'
import loader from "../../../assest/loading-buffering.gif"
const Category = () => {
  const category = useSelector((store)=>store.categories.category)
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const eidtRowItem = (item)=>{
    dispatch(setCategoryId(item))
    dispatch(setTogglePromo())
    navigate(`/category_form/${item._id}`)
    // dispatch(setInitialValue(item));

  }

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
      Cell:(tableProps)=>{
        return (
          tableProps.row.original.sizes.join(",")
        )
      }
    },
    {
      Header: "Action",
      accessor: "action",
      disableSortBy: true,
      Cell: (tableProps) => {
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
    if(isLogin)
    dispatch(getCategoryList())
  }, [isLogin]);
 


  const data = useMemo(() => category?.data, [category]);
  return (
    <div className='category_main'>
      <div className='category_header'>
        <p className='category_header'>Categories</p>
        <button className='create_button' onClick={()=>navigate("/category_form")}>Create New</button>
      </div>
      <div className='category-main'>
       {category?.data?.length>0 && <CategotyTable
       data={data}
       LoadingComponent={loader}
       columns={columns}/> }
      </div>
    </div>
  )
}

export default Category
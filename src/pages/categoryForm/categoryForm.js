import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCategoryList } from "../../feature/CategorySlice";
import {RxCross2} from "react-icons/rx"
const CategoryForm = () => {
  const [post, setPost] = useState('')
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const [image, setImage] = useState([])
  const { values, handleBlur, handleSubmit, setFieldValue, handleChange } =
    useFormik({
      initialValues: {
        category_name: "",
        sizes: "",
        category_image: "",
      },
      onSubmit:(data,action)=>{
        console.log(data)
        dispatch(addCategoryList({data,items}))
        action.resetForm()
      }
    });
    
    const addSizes = ()=>{
      const allpost = { id: new Date().getTime().toString(), name: post }
      setItems([...items, allpost])
      setPost('')
    }
    const deleteItem = (current_index) =>{
      console.log(current_index)
      const updatedItems = items.filter((val) => {
        return current_index !== val.id;
      })
      setItems(updatedItems)
    }
console.log(items)
  return (
    <div className="categoryForm">
      <div>
        <p className="categoryForm_heading">Create Categories</p>
        <hr />
      </div>
      <div className="categoryForm-main">
        <form action="" onSubmit={handleSubmit}>
          <div className="categoryForm-wrap">
            <div>
              <label htmlFor="category" className="categoryForm-title">
                Category<span className="categoryForm_span">*</span>
              </label>
              <br />
              <input
                type="text"
                name="category_name"
                id="category"
                placeholder="Enter New Category"
                className="category-input"
                value={values.category_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="category-image">
              <label htmlFor="size" className="categoryForm-title">
                Size<span className="categoryForm_span">*</span>
              </label>
              <br />
              <input
                type="text"
                id="size"
                placeholder="Enter size"
                className="size-input"
                // name="sizes"
                // value={values.sizes}
                // onChange={handleChange}
                // onBlur={handleBlur}
                value={post}
                onChange={(e)=>setPost(e.target.value)}
                />
              <button className="size-btn" type="button" onClick={addSizes} >Add Size</button>
            <div className="category-size custom-flexwrap">
              {items?.map((item,id)=>{
                return (
                  <div className="save-sizes" key={id}>
                   {item.name} <RxCross2 onClick={()=>deleteItem(item.id)}/>
                  </div>
                )
              })}
            </div>
            </div>
          </div>
          <div className="categoryForm-file">
            <p className="categoryForm-title">
              Category Image<span className="categoryForm_span">*</span>{" "}
              <input
                type="file"
                className="category-file"
                name="category_image"
                onChange={(e)=>{setFieldValue("category_image",e.currentTarget.files[0].name); setImage(URL.createObjectURL(e.currentTarget.files[0])) }}
              />
              <div className="category-image-filled">
                {image.length>0 && <img  src={image} alt="image" />}
              </div>
            </p>
          </div>
          <div className="categoryForm-button">
            <Link to="/category" className="Back-link">
              Back
            </Link>
            <button className="Back-link" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;

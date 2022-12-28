import React, { useState } from "react";
import { Link } from "react-router-dom";
const CategoryForm = () => {
  const [category,setCategory]=useState({
    category_name:"",
    sizes:[""]
  })
  return (
    <div className="categoryForm">
      <div>
        <p className="categoryForm_heading">Create Categories</p>
        <hr />
      </div>
      <div className="categoryForm-main">
        <div className="categoryForm-wrap">
          <div>
            <label htmlFor="category" className="categoryForm-title">
              Category<span className="categoryForm_span">*</span>
            </label>
            <br />
            <input
              type="text"
              name=""
              id="category"
              placeholder="Enter New Category"
              className="category-input"
              value={category.category_name}
              onChange={(e)=>setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="size" className="categoryForm-title">
              Size<span className="categoryForm_span">*</span>
            </label>
            <br />
            <input
              type="text"
              id="size"
              placeholder="Enter size"
              className="size-input"
            />
            <button className="size-btn">Add Size</button>
          </div>
        </div>
        <div className="categoryForm-file">
          <p className="categoryForm-title">
            Category Image<span className="categoryForm_span">*</span>{" "}
            <input type="file" className="category-file" />
          </p>
        </div>
        <div className="categoryForm-button">
          <Link to="/category" className="Back-link">Back</Link>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;

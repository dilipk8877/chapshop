import React from "react";
import { Link } from "react-router-dom";

const ProductForm = () => {
  return (
    <div className="productForm">
      <div className="productForm-main">
        <div>
          <label htmlFor="category" className="categoryForm-title">
            Category<span className="categoryForm_span">*</span>
          </label>
          <br />
          <select name="" id="category" className="productForm-select">
            <option value="fgd">dfd</option>
            <option value="fgd">dfd</option>
            <option value="fgd">dfd</option>
            <option value="fgd">dfd</option>
            <option value="fgd">dfd</option>
          </select>
        </div>
        <div className="productName">
          <label htmlFor="ProductName" className="categoryForm-title">
            Product Name<span className="categoryForm_span">*</span>
          </label>
          <br />
          <input type="text" placeholder="Enter New Product" />
        </div>
        <div className="SKU">
          <label htmlFor="ProductName" className="categoryForm-title">
            SKU<span className="categoryForm_span">*</span>
          </label>
          <br />
          <input type="text" placeholder="Enter New SKU" />
        </div>
        <div className="product-price">
          <div>
            <label htmlFor="ProductName" className="categoryForm-title">
              Buying Price<span className="categoryForm_span">*</span>
            </label>
            <br />
            <input type="text" placeholder="Enter buying price" />
          </div>
          <div>
            <label htmlFor="ProductName" className="categoryForm-title">
              Reselling Price<span className="categoryForm_span">*</span>
            </label>
            <br />
            <input type="text" placeholder="Enter reselling price" />
          </div>
        </div>
        <div className="product-size">Select Sizes</div>
        <div className="product-image">
          <div className="product-image-main">
            <p className="categoryForm-title">
              Main Image<span className="categoryForm_span">*</span>
            </p>
            <input type="file" />
          </div>
          <div className="product-image-sharing">
            <p className="categoryForm-title">
              Sharing Image<span className="categoryForm_span">*</span>
            </p>
            <input type="file" />
          </div>
        </div>
        <div className="productForm-button">
          <Link to="/product" className="Back-link">Retour</Link>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
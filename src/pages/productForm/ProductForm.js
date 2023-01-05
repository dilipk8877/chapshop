import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { getCategoryList } from "../../feature/CategorySlice";
import { addProduct, editProductList, setToggleProductFormTrue } from "../../feature/ProductSlice";
import MainDragzone from "./dragzone/MainDragzone";
import SharingDragzone from "./dragzone/SharingDragZone";
const ProductForm = () => {
  const category = useSelector((store) => store.categories.category);
  const { toggleProductForm, product_id } = useSelector(
    (state) => state.products
  );
  const [productName, setProductName] = useState();
  const [sku, setSku] = useState();
  const [buyingrice, setBuyingPrice] = useState();
  const [resellingPrice, setResellingPrice] = useState();
  const [sizes, setSizes] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [sharingImage, setSharingImage] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryFiltered = category?.data?.filter(
    (item) => item._id === selectedOption?.id
  );

  const arraySorted = [];
  category?.data?.map((item) =>
    arraySorted.push([item.category_name, item._id])
  );
  const sortedCategory = arraySorted?.sort();
  const SelectionArray = [];
  sortedCategory.forEach((item) =>
    SelectionArray.push({
      value: item[0],
      label: item[0],
      id: item[1],
    })
  );

  useEffect(() => {
    dispatch(getCategoryList());
  }, []);

  const handleChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) setSizes([...sizes, value]);
    else {
      setSizes(sizes.filter((e) => e !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        product_name: productName,
        sku: sku,
        buying_price: buyingrice,
        reselling_price: resellingPrice,
        category_id: selectedOption.id,
        mainImage: mainImage,
        sharingImages: sharingImage,
        sizes: sizes,
      })
    );
    setTimeout(() => {
      navigate("/product");
    }, [3000]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      editProductList({
        product_name: productName,
        sku: sku,
        buying_price: buyingrice,
        reselling_price: resellingPrice,
        category_id: selectedOption.id,
        mainImage: mainImage,
        sharingImages: sharingImage,
        sizes: sizes,
        product_id:product_id,
      })
    );
    setTimeout(() => {
      navigate("/product");
    }, [3000]);
  };


  const mainImageShow = mainImage.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name} width="150" height="150" />
    </div>
  ));

  const sharingImageShow = sharingImage.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name} width="150" height="150" />
    </div>
  ));
  return (
    <div className="productForm">
      <div className="productForm-main">
        <div>
          <label htmlFor="category" className="categoryForm-title">
            Category<span className="categoryForm_span">*</span>
          </label>
          <br />
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={SelectionArray}
            isClearable
            className="select-category-productForm"
          />
        </div>
        <div className="productName">
          <label htmlFor="ProductName" className="categoryForm-title">
            Product Name<span className="categoryForm_span">*</span>
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter New Product"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="SKU">
          <label htmlFor="ProductName" className="categoryForm-title">
            SKU<span className="categoryForm_span">*</span>
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter New SKU"
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div className="product-price">
          <div>
            <label htmlFor="ProductName" className="categoryForm-title">
              Buying Price<span className="categoryForm_span">*</span>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter buying price"
              onChange={(e) => setBuyingPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ProductName" className="categoryForm-title">
              Reselling Price<span className="categoryForm_span">*</span>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter reselling price"
              onChange={(e) => setResellingPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="product-size">
          <span>Select Sizes</span>
          <div className="all-size-list">
            {categoryFiltered[0] &&
              categoryFiltered[0]?.sizes?.map((size, idx) => {
                return (
                  <div className="size-label" key={idx}>
                    {" "}
                    <label htmlFor={size}>
                      <input
                        id={size}
                        value={size}
                        type="checkbox"
                        onChange={(e) => handleChecked(e)}
                      />
                      {size}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="product-image">
          <div className="product-image-main">
            <p className="categoryForm-title">
              Main Image<span className="categoryForm_span">*</span>
            </p>
            <MainDragzone mainImage={mainImage} setMainImage={setMainImage} />
            {/* <input type="file" onChange={(e)=>setMainImage(e.target.files[0])} /> */}
          </div>
            <div>
             {mainImageShow}
            </div>
          <div className="product-image-sharing">
            <p className="categoryForm-title">
              Sharing Image<span className="categoryForm_span">*</span>
            </p>
            <SharingDragzone
              setSharingImage={setSharingImage}
              sharingImage={sharingImage}
            />
            {/* <input type="file" onChange={(e)=>setSharingImage([...e.target.files])} /> */}
          </div>
            <div className="sharing-image">
              {sharingImageShow}
            </div>
        </div>
        <div className="productForm-button">
          <Link
            to="/product"
            className="Back-link"
            onClick={() => dispatch(setToggleProductFormTrue())}
          >
            Retour
          </Link>
          {toggleProductForm ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <button onClick={handleUpdate}>Update</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

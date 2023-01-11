import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getProductList, setProductId, setToggleProductFormFalse } from "../../../feature/ProductSlice";
import ProductTable from "../../../FormPages/reactTable/ProductTable";
const Product = () => {
  const product = useSelector((state) => state.products.product);
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const eidtRowItem = (item)=>{
    dispatch(setProductId(item))
    dispatch(setToggleProductFormFalse())
    navigate(`/product_form/${item._id}`)

  }
  const columns = useMemo(
    () => [
      {
        Header: "Product",
        accessor: "product_name",
        Cell: (productImage) => {
          const imageUrl = `http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/${productImage.row.original.main_image[0].filename}`;
          return (
            <div className="category-name-image">
              <img src={imageUrl} alt="pic"></img>
              <p>{productImage.row.original.product_name}</p>
            </div>
          );
        },
      },
      {
        Header: "Category",
        accessor: "category.category_name",
      },
      {
        Header: "SKU",
        accessor: "sku",
      },
      {
        Header: "Buying Price",
        accessor: "buying_price",
      },
      {
        Header: "Reselling Price",
        accessor: "reselling_price",
      },
      {
        Header: "Public",
        accessor: "public",
      },

      {
        Header: "Action",
        accessor: "action",
        disableSortBy: true,
        Cell: (tableProps) => {
          const rowIdx = tableProps.row.original._id
          return (
            <>
              <button className="category-edit-btn"  onClick={()=>eidtRowItem(tableProps.row.original)}>Edit</button>{" "}
              <button className="category-edit-delete" onClick={()=>dispatch(deleteProduct(rowIdx))}>Delete</button>
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getProductList());
  }, []);
  const data = useMemo(() => product?.data, [product]);
  return (
    <div>
      <div className="product_header">
        <p className="product_header">Products</p>
        <button className="create_button"  onClick={()=>navigate("/product_form")}>
          Create New
        </button>
      </div>
      <div className="category-main">
        {product?.data?.length>0 && <ProductTable data={data} columns={columns} />}
        {/* <ProductTable data={data} columns={columns} /> */}
      </div>
    </div>
  );
};

export default Product;

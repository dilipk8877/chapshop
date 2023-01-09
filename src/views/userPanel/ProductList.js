import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { getProductDeatils } from "../../feature/UserProductDetails";
const ProductList = () => {
  const productList = useSelector(
    (state) => state.userProductList.userproductList
  );
  console.log(productList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goProductDetails = (item) => {
    dispatch(getProductDeatils(item._id));
    navigate("/productDetails");
  };
  return (
    <div>
      <div className="productList-header">
        <Link className="productList-link" to="/userCategory">
          <AiOutlineArrowLeft /> Back
        </Link>
      </div>
      {productList?.length === 0 ? (
        <div>no data found</div>
      ) : (
        <div className="user-card">
          {productList?.data?.map((item, index) => {
            return (
              <div key={index}>
                <Card
                  sx={{ maxWidth: 210 }}
                  onClick={() => goProductDetails(item)}
                >
                  <img
                    className="user-card-image"
                    src={
                      "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                      `${item?.main_image[0]?.filename}`
                    }
                    alt=""
                  />
                  <div className="productList-details">
                    <p>
                      Product: <span>{item.product_name}</span>
                    </p>
                    <p>
                      price: <span>{item.reselling_price}</span>
                    </p>
                    <p>
                      size: <span>{item.sizes.join(",")}</span>
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;

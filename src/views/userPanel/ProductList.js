import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductList } from "../../feature/UserProductListSlice";

const ProductList = () => {
  const productList = useSelector((state) => state.userProductList.userproductList);
  console.log(productList);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserProductList());
  }, [dispatch]);
  return <div>ProductList</div>;
};

export default ProductList;

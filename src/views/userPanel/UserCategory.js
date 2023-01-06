import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getUserCategory } from "../../feature/UserCategorySlice";
import { getUserProductList } from "../../feature/UserProductListSlice";
import { useNavigate } from "react-router-dom";

const UserCategory = () => {
  const userCategory = useSelector(
    (state) => state.userCategories.userCategory
  );
  console.log(userCategory);
  const dispatch = useDispatch();
    const navigate = useNavigate()
  useEffect(() => {
    dispatch(getUserCategory());
  }, [dispatch]);


  const goProductList = (item)=>{
    dispatch(getUserProductList(item._id))
    navigate("/productList")
  }
  return (
    <div className="user-main">
      <div className="user-header">
        <header>
          <h3>Chapshop</h3>
        </header>
      </div>
      <div className="user-card">
        {userCategory?.data?.map((item, index) => {
          return (
            <Card sx={{ maxWidth: 210 }} key={index} onClick={()=>goProductList(item)}>
              <img className="user-card-image"
                src={
                  "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                  `${item?.category_image?.filename}`
                }
                alt=""
              />
                <Typography gutterBottom variant="h5" component="div" className="user-card-categoryName">
                  {item.category_name}
                </Typography>
              {/* <CardContent>
              </CardContent> */}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserCategory;

import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import {MdFileDownload} from "react-icons/md"
import { saveAs } from 'file-saver'
const ProductDetails = () => {
  const prod_details = useSelector(
    (state) => state.userProductDetail.proDetails
  );
  console.log(prod_details);
const image_url = prod_details?.data?.sharing_images
console.log(image_url)
  const downloadImage = () => {

//     <a
//   href={`http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/sharingImages/1673243511056-mediamodifier-7cERndkOyDw-unsplash.jpg`}
//   download
//  ></a>
  };
    // saveAs('image_url', 'image.jpg') // Put your image url here.
    // image_url.forEach(({filename,mimetype,originalname})=>saveAs("http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/"+filename,originalname))
    // saveAs(URL.createObjectURL("http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/sharingImages/1673243511056-mediamodifier-7cERndkOyDw-unsplash.jpg"),'image.jpg')

  
  return (
    <>
      <div className="productList-header">
        <Link className="productList-link" to="/productList">
          <AiOutlineArrowLeft /> Back
        </Link>
      </div>
      <div className="productDetails-card">
        <div className="productDetails-first">
          <Carousel fade>
            {prod_details?.data?.sharing_images?.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className=" productDetails-image"
                    src={
                      "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                      `${item?.filename}`
                    }
                    alt="First slide"
                    width={350}
                    height={450}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="productDetails-second">
          <h3>{prod_details?.data?.product_name}</h3>
          <hr />
          <p>
            Price: <span>{prod_details?.data?.reselling_price}</span>
          </p>
          <p>
            Size: <span>{prod_details?.data?.sizes?.join(",")}</span>
          </p>
          <p>
            Product Id: <span>{prod_details?.data?._id}</span>
          </p>
          <div className="productDetails-second-button">
          <button onClick={downloadImage}>Download <MdFileDownload/></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

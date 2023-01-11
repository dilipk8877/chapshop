import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  addCategoryList,
  editCategory,
  populateCategory,
  setInitialValue,
  setToggleFalse,
} from "../../feature/CategorySlice";
import { RxCross2 } from "react-icons/rx";
import Dropzone from "../dropeZone/Dropzone";
import { useDropzone } from "react-dropzone";
const CategoryForm = () => {
  const { toggleState, category_id, initialValue,Createnavigate,populate } = useSelector(
    (state) => state.categories
    );
    const navigate = useNavigate()
console.log(populate?.data?.sizes)
  const [post, setPost] = useState("");
  const [items, setItems] = useState([]);
  console.log(items)
  const dispatch = useDispatch();
  const [category_name, setCategory_name] = useState();
  const [fieldImage, setFieldImage] = useState();
  useEffect(()=>{
    setCategory_name(populate && populate?.data?.category_name ? populate?.data?.category_name : "")
    setItems(populate && populate?.data?.sizes ? populate?.data?.sizes :[])
    setFieldImage(populate && populate?.data?.category_image?.filename ? populate?.data?.category_image?.filename:"")
  },[populate])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setFieldImage(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

const {id} = useParams()
  useEffect(() => {
    if(Createnavigate === "success"){
      navigate("/category")
    }
    dispatch(populateCategory(id))
  }, [fieldImage,Createnavigate]);
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });
  const saveCategory = (e) => {
    e.preventDefault();
    dispatch(addCategoryList({ category_name, items, fieldImage }))
  };

  const updateCategory = (e) => {
    e.preventDefault();
    dispatch(editCategory({ category_name, items, fieldImage, category_id }))
  };

  const addSizes = () => {
    // const allpost = { id: new Date().getTime().toString(), name: post };
    setItems([...items,post]);
    setPost("");
  };
  const deleteItem = (current_index) => {
    const updatedItems = items.filter((val) => {
      return current_index !== val.id;
    });
    setItems(updatedItems);
  };


  const handleBack = () => {
    dispatch(setToggleFalse());
    dispatch(setInitialValue(""));
    navigate("/category");
  };
  const imageUrl=`http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/${fieldImage}`;

  return (
    <div className="categoryForm">
      <div>
        <p className="categoryForm_heading">Create Categories</p>
        <hr />
      </div>
      <div className="categoryForm-main">
        <form action="">
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
                value={category_name}
                onChange={(e) => setCategory_name(e.target.value)}
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
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
              <button className="size-btn" type="button" onClick={addSizes}>
                Add Size
              </button>
              <div className="category-size custom-flexwrap">
                {items?.map((item, id) => {
                  console.log(item);
                  return (
                    <div className="save-sizes" key={id}>
                      <span>
                        {item}{" "}
                        <RxCross2 onClick={() => deleteItem(item.id)} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="categoryForm-file">
            <p className="categoryForm-title">
              Category Image<span className="categoryForm_span">*</span>{" "}
              {/* <Dropzone setImages={setImages} images={images}/> */}
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragAccept ? "Drag Active" : "You can drop your file here."}
              </div>
              <div className="sharing-image">
                <img src={imageUrl} alt=""  />
              </div>
              {/* <input
                type="file"
                className="category-file"
                name="category_image"
                // value={fieldImage}
                onChange={(e) =>{ setFieldImage(e.target.files[0]) ;setImage(URL.createObjectURL(e.currentTarget.files[0]))}}
                // onChange={(e)=>{setFieldValue("category_image",e.currentTarget.files[0]); setImage(URL.createObjectURL(e.currentTarget.files[0])) }}
              /> */}
              {/* {
                images.length>0 &&  <div className="category-image-filled">
                  {images.map((image,index)=>{
                    return (
                      <div>
                        <img src={image.name} alt="" key={index}/>
                      </div>
                    )
                  })}
                </div>
              } */}
            </p>
          </div>
          <div className="categoryForm-button">
            <button className="Back-link" onClick={handleBack}>
              Back
            </button>
            {toggleState ? (
              <button
                className="Back-link"
                type="submit"
                onClick={saveCategory}
              >
                Submit
              </button>
            ) : (
              <button
                className="Back-link"
                type="submit"
                onClick={updateCategory}
              >
                update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;

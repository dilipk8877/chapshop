import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addCategoryList,
  editCategory,
  setInitialValue,
  setToggleFalse,
} from "../../feature/CategorySlice";
import { RxCross2 } from "react-icons/rx";
import Dropzone from "../dropeZone/Dropzone";
import { useDropzone } from "react-dropzone";
const CategoryForm = () => {
  const { toggleState, category_id, initialValue } = useSelector((state) => state.categories);
  // const categoryId = category_id._id
  const [post, setPost] = useState("");
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const [category_name, setCategory_name] = useState(initialValue?.category_name ? initialValue?.category_name:"" );
  const [fieldImage, setFieldImage] = useState();

console.log(fieldImage)
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setFieldImage(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  useEffect(() => {
    fieldImage?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [fieldImage]);
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
    dispatch(addCategoryList({ category_name, items, fieldImage }));
  };

  const updateCategory = (e) => {
    e.preventDefault();
    dispatch(editCategory({ category_name, items, fieldImage, category_id }));
  };

  const addSizes = () => {
    const allpost = { id: new Date().getTime().toString(), name: post };
    setItems([...items, allpost]);
    setPost("");
  };
  const deleteItem = (current_index) => {
    const updatedItems = items.filter((val) => {
      return current_index !== val.id;
    });
    setItems(updatedItems);
  };

  const thumbs = fieldImage?.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name} width="150" height="150" />
    </div>
  ));

  const handleBack = ()=>{
    dispatch(setToggleFalse())
    dispatch(setInitialValue(""))
  }
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
                  return (
                    <div className="save-sizes" key={id}>
                      {item.name}{" "}
                      <RxCross2 onClick={() => deleteItem(item.id)} />
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
              <div className="sharing-image">{thumbs}</div>
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
            <Link
              to="/category"
              className="Back-link"
              onClick={handleBack}
            >
              Back
            </Link>
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

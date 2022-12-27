import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getLogin } from "../../feature/LoginSlice";
const LoginPage = () => {
  const dispatch = useDispatch()
  const { values, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().required("email is required"),
        password: Yup.string().required("password is reaquired"),
      }),
      onSubmit: (data) => {
        console.log(data);
        dispatch(getLogin(data))
      },
    });
  return (
    <div className="loginForm">
      <div className="form">
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          id="email"
          placeholder="Enter Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* <div>
          {touched.email && errors.email ? (
            <span style={{ color: "#b11111", fontSize: "15px" }}>
              {errors.email}
            </span>
          ) : null}
        </div> */}
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="text" id="password" placeholder="Enter Password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        />
        {/* <div>
          {touched.password && errors.password ? (
            <span style={{ color: "#b11111", fontSize: "15px" }}>
              {errors.password}
            </span>
          ) : null}
        </div> */}
        <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
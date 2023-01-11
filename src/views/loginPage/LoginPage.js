import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getLogin } from "../../feature/LoginSlice";
const LoginPage = () => {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
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
        dispatch(getLogin(data))
      },
    });

  useEffect(() => {
    if (isLogin) {
      navigate("/category");
    }
  }, [isLogin]);
  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit} className="loginForm-form">
        <div className="loginForm-email">
          <span>Email</span>
          <input
            type="text"
            id="email"
            placeholder="Enter Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>
            {touched.email && errors.email ? (
              <span style={{ color: "#b11111", fontSize: "15px" }}>
                {errors.email}
              </span>
            ) : null}
          </span>
        </div>
        <div className="loginForm-password">
          <span>Password</span>
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>
            {" "}
            {touched.password && errors.password ? (
              <span style={{ color: "#b11111", fontSize: "15px" }}>
                {errors.password}
              </span>
            ) : null}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

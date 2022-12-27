import axios from "axios";

export const customFetch = axios.create({
  baseURL: `${process.env.REACT_APP_SECRET_NAME}`,
  headers: {
    // Authorization: token,
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export const setToken = (token) => {
  customFetch.defaults.headers.common['Authorization'] = token;
}


export default customFetch;
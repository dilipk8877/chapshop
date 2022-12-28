import axios from "axios";
const token = localStorage.getItem("token")
export const customFetch = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  headers: {
    // Authorization: token,
    Accept: "application/json",
    "Content-type": "application/json",
    "x-auth-token": `${token}`
  },
});

export const setToken = (token) => {
  customFetch.defaults.headers.common['x-auth-token'] = token;
}

export default customFetch;

import axios from "axios";
const token = localStorage.getItem("token")
export const customFetch = axios.create({
  baseURL: "http://localhost:4001/api/v1",
  headers: {
    Accept: "application/json",
    'Content-Type': 'multipart/form-data',
    "x-auth-token": `${token}`
  },
});

export const customLogin = axios.create({
  baseURL: "http://localhost:4001/api/v1",
  headers: {
    Accept: "application/json",
  },
});

export const setToken = (token) => {
  customFetch.defaults.headers.common['x-auth-token'] = token;
}

export default customFetch;

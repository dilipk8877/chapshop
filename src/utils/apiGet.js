import axios from "axios";
const token = localStorage.getItem("token")
export const customFetch = axios.create({
  baseURL: "http://localhost:8001/api/v1",
  headers: {

    Accept: "application/json",
    'Content-Type': 'multipart/form-data',
    "x-auth-token": `${token}`
  },
});

export const setToken = (token) => {
  customFetch.defaults.headers.common['x-auth-token'] = token;
}

export default customFetch;

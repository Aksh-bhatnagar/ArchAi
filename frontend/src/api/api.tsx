import axios from "axios"

const api = axios.create({
  baseURL: "https://archai-mvkf.onrender.com/api/v1",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;

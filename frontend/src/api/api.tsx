import axios from "axios"

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});


export default api;

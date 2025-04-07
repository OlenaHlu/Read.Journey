import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://readjourney.b.goit.study/api/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers.skipAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://readjourney.b.goit.study/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("Token from localStorage: ", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

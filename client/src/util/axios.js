import axios from "axios";

// Set your baseURL directly
const baseURL = "http://localhost:5000";

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

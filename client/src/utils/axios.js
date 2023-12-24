import axios from "axios";
// config
import { URL } from "../url";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

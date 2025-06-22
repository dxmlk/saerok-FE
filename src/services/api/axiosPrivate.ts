// 토큰 붙이는 인스턴스
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosPrivate = axios.create({
  baseURL: "https://api.saerok.app/api/v1",
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;

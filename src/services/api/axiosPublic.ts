// 인증 필요 없는 요청
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default axiosPublic;

// 인증 필요 없는 요청
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://dev-api.saerok.app/api/v1",
});

export default axiosPublic;

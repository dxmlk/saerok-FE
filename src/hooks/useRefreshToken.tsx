import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const navigate = useNavigate();
  const [refreshTokenProcessed, setRefreshTokenProcessed] = useState(false);

  // 리프레시 토큰을 사용하여 액세스 토큰을 갱신하는 함수
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("/api/v1/auth/refresh");

      const { accessToken, signupStatus } = response.data;

      // 새 액세스 토큰 저장
      localStorage.setItem("accessToken", accessToken);

      // 회원가입 상태에 따라 처리
      if (signupStatus === "PROFILE_REQUIRED") {
        // 닉네임 입력 화면으로 이동
        navigate("/register");
      } else if (signupStatus === "COMPLETED") {
        // 자동 로그인 처리
        navigate("/saerok"); // 홈 페이지로 이동 처리
      }

      // 리프레시 토큰 처리 완료 상태로 업데이트
      setRefreshTokenProcessed(true);
    } catch (error) {
      console.error("리프레시 토큰 갱신 실패", error);
      // 로그인 실패
    }
  };

  useEffect(() => {
    refreshAccessToken(); // 앱 실행 시 리프레시 토큰을 갱신
  }, [navigate]);

  return { refreshTokenProcessed };
};

export default useRefreshToken;

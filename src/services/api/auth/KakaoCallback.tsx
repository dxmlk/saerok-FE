import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code"); // 카카오에서 받은 인가 코드
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      console.log("카카오 인가코드:", code);

      const backendApiUrl = "/api/v1/auth/kakao/login"; //  백엔드 API 주소

      const requestBody = {
        authorizationCode: code,
      };

      console.log("Request Body:", requestBody);

      axios
        .post(backendApiUrl, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const { accessToken, signupStatus } = response.data;
          console.log("Access Token:", accessToken);
          console.log("Signup Status:", signupStatus);

          // accessToken 저장
          localStorage.setItem("accessToken", accessToken);

          // 회원가입 상태에 따라 처리
          if (signupStatus === "PROFILE_REQUIRED") {
            navigate("/register"); // 프로필 입력 화면으로 이동
          } else if (signupStatus === "COMPLETED") {
            navigate("/saerok"); // 로그인 완료된 경우
          } else {
            console.warn("알 수 없는 회원가입 상태:", signupStatus);
          }
        })
        .catch((error) => {
          console.error("카카오 로그인 실패", error);
          if (error.response) {
            console.error("응답 상태 코드:", error.response.status);
            console.error("응답 데이터:", error.response.data);
            console.error("응답 헤더:", error.response.headers);
          }
        });
    }
  }, [code, navigate]);

  return <div className="flex absolute top-1/2 justify-center w-full h-full">카카오 로그인 중</div>;
};

export default KakaoCallback;

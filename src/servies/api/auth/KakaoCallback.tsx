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

      const redirectUrl = encodeURIComponent(import.meta.env.VITE_REDIRECT_URL); // redirect_uri 설정
      const client_id = import.meta.env.VITE_CLIENT_ID; // 카카오 REST API 키

      console.log("Client ID:", client_id); // client_id가 제대로 설정되었는지 확인
      console.log("Redirect URI:", redirectUrl); // redirect_uri가 제대로 설정되었는지 확인

      if (!client_id) {
        console.error("VITE_REST_API 환경 변수가 설정되지 않았습니다.");
        return;
      }

      const apiUrl = `https://kauth.kakao.com/oauth/token`;

      // POST 요청으로 카카오 액세스 토큰 요청
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("client_id", client_id);
      params.append("redirect_uri", redirectUrl);
      params.append("code", code);

      console.log("Request Params:", params.toString()); // 요청 파라미터 로그 출력

      axios
        .post(apiUrl, params, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
        .then((response) => {
          const { access_token, signupStatus } = response.data;
          console.log("Access Token:", access_token);

          // accessToken 저장 (로컬스토리지에 저장)
          localStorage.setItem("accessToken", access_token);

          // 회원가입 상태에 따라 처리
          if (signupStatus === "PROFILE_REQUIRED") {
            navigate("/register"); // 프로필 입력 화면으로 이동
          } else if (signupStatus === "COMPLETED") {
            navigate("/saerok"); // 로그인 완료된 경우
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

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginKakao } from "services/api/auth";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      if (!code) return;

      try {
        // 백엔드에서 카카오 인증 처리
        const { accessToken, signupStatus } = await loginKakao(code);

        // 토큰 저장
        localStorage.setItem("accessToken", accessToken);

        // 회원가입 상태 분기 처리
        if (signupStatus === "PROFILE_REQUIRED") {
          navigate("/register");
        } else if (signupStatus === "COMPLETED") {
          navigate("/saerok");
        } else {
          console.warn("알 수 없는 회원가입 상태:", signupStatus);
        }
      } catch (error: any) {
        console.error("카카오 로그인 실패", error);
        if (error.response) {
          console.error("응답 상태 코드:", error.response.status);
          console.error("응답 데이터:", error.response.data);
          console.error("응답 헤더:", error.response.headers);
        }
        // 로그인 실패 시 안내 또는 리다이렉트 여기에
      }
    };

    handleKakaoLogin();
  }, [code, navigate]);

  return <div className="flex absolute top-1/2 justify-center w-full h-full">카카오 로그인 중</div>;
};

export default KakaoCallback;

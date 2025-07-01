import LoadingScreen from "components/common/LoadingScreen";
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { loginKakao, refreshAuth } from "services/api/auth/index";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  useEffect(() => {
    const handleKakaoLogin = async () => {
      if (!code) {
        navigate("/", { replace: true });
        return;
      }
      try {
        const { accessToken, signupStatus } = await loginKakao(code);
        localStorage.setItem("accessToken", accessToken);
        await refreshUser();

        console.log("카카오 로그인 응답:", { signupStatus });

        if (signupStatus === "PROFILE_REQUIRED") {
          navigate("/register", { state: { fromKakao: true } });
          return;
        }
        if (signupStatus === "COMPLETED") {
          navigate("/saerok");
          return;
        }
        navigate("/", { replace: true });
      } catch (error) {
        // 에러 처리
      }
    };

    handleKakaoLogin();
  }, [code]);

  return <LoadingScreen />;
};

export default KakaoCallback;

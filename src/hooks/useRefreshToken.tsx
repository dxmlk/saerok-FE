import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const isAccessTokenValid = (accessToken: string | null): boolean => {
  if (!accessToken) return false;

  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    const isValid = payload.exp > now;
    // console.log("[useRefreshToken] ?�� accessToken payload: ", payload);
    return isValid;
  } catch (e) {
    // console.error("[useRefreshToken] ??accessToken 파싱 실패", e);
    return false;
  }
};

const useRefreshToken = () => {
  const navigate = useNavigate();
  const [refreshTokenProcessed, setRefreshTokenProcessed] = useState(false);

  useEffect(() => {
    const refresh = async () => {
      // console.log("[useRefreshToken] ?�� 리프레시 요청 시작");

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          // console.warn("[useRefreshToken] 리프레스 토큰 없음");
          setRefreshTokenProcessed(true);
          return;
        }

        const response = await axios.post(
          "/api/v1/auth/refresh",
          { refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { accessToken, signupStatus } = response.data;
        // console.log("[useRefreshToken] 리프레시 성공 \n", response.data);

        localStorage.setItem("accessToken", accessToken);

        if (signupStatus === "COMPLETED") {
          // console.log("[useRefreshToken] 로그인 완료 새록으로 이동 ");
          navigate("/saerok");
        } else {
          // console.warn("[useRefreshToken] 미완료 회원은 회원가입 페이지로 이동");
          navigate("/signup");
        }
      } catch (error) {
        // console.error("[useRefreshToken] 리프레시 실패 \n", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // navigate("/login"); // 필요 시
      } finally {
        setRefreshTokenProcessed(true);
      }
    };

    refresh();
  }, [navigate]);

  return { refreshTokenProcessed };
};

export default useRefreshToken;

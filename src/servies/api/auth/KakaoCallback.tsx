import { ReactComponent as LoadingBird } from "assets/background/loading.svg";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      console.log("카카오 인가코드:", code);
      // 나중에 여기서 백엔드에 POST로 code 전달

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("mockUser", JSON.stringify({ nickname: "테스트 회원", email: "test@kakao.com" }));

      navigate("/map");
    }
  }, [code]);

  return (
    <div className="flex absolute top-1/2  justify-center w-full h-full">
      카카오 로그인 중
      <LoadingBird />
    </div>
  );
};

export default KakaoCallback;

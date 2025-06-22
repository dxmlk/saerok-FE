import { useEffect, useState } from "react";
import { ReactComponent as SplashLogo } from "assets/icons/logo/splash.svg";
import { useNavigate } from "react-router-dom";
import useRefreshToken, { isAccessTokenValid } from "hooks/useRefreshToken";

type SplashStep = "start" | "transition" | "final";

const OnboardingPage = () => {
  const [step, setStep] = useState<SplashStep>("start");
  const navigate = useNavigate();
  const { refreshTokenProcessed } = useRefreshToken();

  useEffect(() => {
    const timer1 = setTimeout(() => setStep("transition"), 1500);
    const timer2 = setTimeout(() => setStep("final"), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (step === "final" && refreshTokenProcessed) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken && isAccessTokenValid(accessToken)) {
        navigate("/saerok");
      } else {
        // 온보딩 애니메이션 종료 후 로그인 페이지로 이동
        navigate("/login");
      }
    }
  }, [step, refreshTokenProcessed, navigate]);

  const isStart = step === "start";
  const isTransition = step === "transition";

  return (
    <div
      className={`h-[100dvh] w-[100dvw] flex flex-col font-pretendard justify-center items-center transition-colors duration-700 ${
        isStart ? "bg-custom-gradient" : "bg-white"
      }`}
    >
      <div
        className={`flex flex-col items-center gap-8 transition-opacity duration-500 ${
          isTransition ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className={`text-button-1 transition-colors duration-500 text-mainBlue`}>새를 기록하다</div>
        <SplashLogo className={`transition-colors duration-500 text-mainBlue`} />
      </div>
    </div>
  );
};

export default OnboardingPage;

import { useEffect, useState } from "react";
import { ReactComponent as SplashLogo } from "assets/icons/logo/splash.svg";
import Login from "features/onboarding/components/Login";
import { useNavigate } from "react-router-dom";
import useRefreshToken, { isAccessTokenValid } from "hooks/useRefreshToken";

type SplashStep = "start" | "transition" | "final";

const OnboardingPage = () => {
  const [step, setStep] = useState<SplashStep>("start");
  const navigate = useNavigate();
  const { refreshTokenProcessed } = useRefreshToken();

  useEffect(() => {
    console.log("[OnboardingPage] ⏱️ 타이머 시작");
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

      console.log("[OnboardingPage] 🎫 accessToken 상태:", accessToken);
      if (accessToken && isAccessTokenValid(accessToken)) {
        console.log("[OnboardingPage] ✅ 유효한 accessToken → /saerok 이동");
        navigate("/saerok");
      } else {
        console.log("[OnboardingPage] ❌ accessToken 유효하지 않음 → 로그인 필요");
      }
    }
  }, [step, refreshTokenProcessed, navigate]);

  const isStart = step === "start";
  const isTransition = step === "transition";
  const isFinal = step === "final";

  return (
    <div
      className={`h-[100dvh] w-[100dvw] max-w-500 flex flex-col font-pretendard justify-center items-center transition-colors duration-700 ${
        isStart ? "bg-custom-gradient" : "bg-white"
      }`}
    >
      <div
        className={`flex flex-col items-center gap-8 transition-opacity duration-500 ${
          isTransition ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className={`text-button-1 transition-colors duration-500 ${isStart ? "text-mainBlue" : "text-mainBlue"}`}>
          새를 기록하다
        </div>
        <SplashLogo className={`transition-colors duration-500 ${isStart ? "text-mainBlue" : "text-mainBlue"}`} />
      </div>

      <div
        className={`absolute bottom-56 w-full transition-opacity duration-500 ${isFinal ? "opacity-100" : "opacity-0"}`}
      >
        <Login />
      </div>
    </div>
  );
};

export default OnboardingPage;

import { useEffect, useState } from "react";
import { ReactComponent as SplashLogo } from "assets/icons/logo/splash.svg";

type SplashStep = "start" | "transition" | "final";

const SplashScreen = () => {
  const [step, setStep] = useState<SplashStep>("start");

  useEffect(() => {
    const timer1 = setTimeout(() => setStep("transition"), 1500);
    const timer2 = setTimeout(() => setStep("final"), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const isStart = step === "start";
  const isTransition = step === "transition";
  const isFinal = step === "final";

  return (
    <div
      className={`h-[100dvh] w-[100dvw] flex flex-col font-pretendard justify-center items-center transition-colors duration-700 ${
        isStart ? "bg-completeGreen" : "bg-white"
      }`}
    >
      <div
        className={`flex flex-col items-center gap-8 transition-opacity duration-500 ${
          isTransition ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className={` text-button-1 transition-colors duration-500 ${isStart ? "text-white" : "text-saerokGreen"}`}>
          새를 기록하다
        </div>
        <SplashLogo className={`transition-colors duration-500 ${isStart ? "text-white" : "text-saerokGreen"}`} />
      </div>

      <div
        className={`absolute bottom-96 flex flex-col justify-center  gap-24 transition-opacity duration-700 ${
          isFinal ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-row text-body-1 gap-1">
          <span className="text-font-whitegrayDark">이미 계정이 있다면,</span>
          <button className="text-saerokGreen"> 로그인</button>
        </div>
        <div className="flex flex-row text-body-1 gap-1">
          <span className="text-font-whitegrayDark">새로 시작한다면, </span>
          <button className="text-saerokGreen">회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

import Login from "features/onboarding/components/Login";
import { ReactComponent as SplashLogo } from "assets/icons/logo/splash.svg";

const LoginPage = () => {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col font-pretendard justify-center items-center bg-white">
      <div className={`text-button-1 transition-colors duration-500 text-mainBlue`}>새를 기록하다</div>
      <SplashLogo className={`transition-colors duration-500 text-mainBlue`} />

      <div className="absolute bottom-56 w-full flex justify-center">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;

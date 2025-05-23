import { ReactComponent as AppleIcon } from "assets/icons/logo/apple.svg";
import { ReactComponent as KakaoIcon } from "assets/icons/logo/kakao.svg";
import { KAKAO_AUTH_URL } from "servies/api/auth/kakaoLogin";

type LoginType = "login" | "signup";

interface LoginProps {
  type: LoginType;
}

const Login = ({ type }: LoginProps) => {
  return (
    <>
      <div className="px-24 flex flex-col justify-center gap-10 font-pretendard font-600 text-20">
        <div className="flex flex-row h-54 w-full bg-black text-white gap-15 items-center justify-center rounded-10 ">
          <AppleIcon />
          <div>애플로 시작하기</div>
        </div>
        <div
          onClick={() => (window.location.href = KAKAO_AUTH_URL)}
          className="flex flex-row h-54 w-full bg-[#FEE500] text-black gap-5 items-center justify-center rounded-10 "
        >
          <KakaoIcon />
          <div>카카오로 시작하기</div>
        </div>
      </div>
      <div className="mt-28 text-subtitle-3 flex justify-center">로그인 없이 이용하기</div>
    </>
  );
};

export default Login;

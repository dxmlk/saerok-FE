import { useState } from "react";
import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { useNavigate } from "react-router-dom";
import NicknameInput from "features/mypage/components/NicknameInput";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="h-[100dvh] w-[100dvw] px-24 bg-white">
      {!submitted && (
        <>
          <div className="h-76 w-full bg-background-white flex items-center justify-start  ">
            <BackIcon onClick={() => navigate(-1)} className="h-17 w-17" />
          </div>
          <div className="mt-24 mb-54 text-font-black text-headline-1 font-moneygraphy">회원가입</div>
          <div className="flex flex-col gap-7 font-pretendard">
            <div className="ml-12 ">닉네임 입력(필수)</div>
            <NicknameInput />
          </div>
        </>
      )}

      {submitted && <div className="mt-92 text-black font-moneygraphy text-headline-1">회원가입이 완료됐어요 🎉</div>}

      {!submitted && (
        <div
          onClick={() => setSubmitted(true)}
          className="fixed bottom-44 bg-mainBlue h-52 left-24 right-24 rounded-10 items-center flex justify-center font-pretendard text-button-1 text-white"
        >
          다음
        </div>
      )}

      {submitted && (
        <div className="fixed bottom-44 bg-mainBlue h-52 left-24 right-24 rounded-10 items-center flex justify-center font-pretendard text-button-1 text-white">
          새록 시작하기
        </div>
      )}
    </div>
  );
};

export default RegisterPage;

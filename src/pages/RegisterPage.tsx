import { useState } from "react";
import { z } from "zod";
import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { sub } from "date-fns";

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
            <div className="w-full h-44  border-saerokGreen border-2 rounded-10 overflow-hidden flex flex-row items-center justify-between px-16">
              <input className="w-full h-full outline-none" />
              <button className="ml-20 inline-block whitespace-nowrap h-full text-saerokGreen text-caption-0">
                중복 확인
              </button>
            </div>
          </div>
        </>
      )}

      {submitted && <div className="mt-92 text-black font-moneygraphy text-headline-1">회원가입이 완료됐어요 🎉</div>}

      {!submitted && (
        <div
          onClick={() => setSubmitted(true)}
          className="fixed bottom-44 bg-saerokGreen h-52 left-6 right-6 rounded-10 items-center flex justify-center font-pretendard text-button-1 text-white"
        >
          다음
        </div>
      )}

      {submitted && (
        <div className="fixed bottom-44 bg-saerokGreen h-52 left-6 right-6 rounded-10 items-center flex justify-center font-pretendard text-button-1 text-white">
          새록 시작하기
        </div>
      )}
    </div>
  );
};

export default RegisterPage;

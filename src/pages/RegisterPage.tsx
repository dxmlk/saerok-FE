import { useState } from "react";
import { z } from "zod";
import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { ReactComponent as ExclamationIcon } from "assets/icons/button/exclamation.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { sub } from "date-fns";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [input, setInput] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleDuplicationCheck = async (nickname: string) => {
    try {
      const res = await axios.get(`/api/v1/user/check-nickname?nickname=${nickname}`);
      const isUsed = res.data.isUsedByOtherUser;

      if (isUsed) {
        setIsNicknameAvailable(false);
      } else {
        setIsNicknameAvailable(true);
      }

      setIsButtonClicked(true);

      console.log("isNicknameAvailable? ", isNicknameAvailable);
    } catch (err) {
      console.log("닉네임 중복 확인에 실패하였습니다.", err);
    }
  };

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
            <div
              className={`w-full h-44  ${isInputFocused ? "border-mainBlue" : "border-font-whitegrayLight"} ${isButtonClicked ? `${isNicknameAvailable ? "border-confirmBlue" : "border-red"}` : ``} border-2 rounded-10 overflow-hidden flex flex-row items-center justify-between px-16`}
            >
              <input
                className="w-full h-full outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                  setIsInputFocused(false);
                  setIsButtonClicked(false);
                }}
              />
              {!isButtonClicked && (
                <button
                  onClick={() => handleDuplicationCheck(input)}
                  className="ml-20 inline-block whitespace-nowrap h-full text-mainBlue text-caption-0"
                >
                  중복 확인
                </button>
              )}
              {isButtonClicked && (
                <>
                  {isNicknameAvailable ? (
                    <div className="w-18 h-18 rounded-full flex justify-center items-center bg-confirmBlue">
                      <CheckIcon className="text-white w-12" />
                    </div>
                  ) : (
                    <div className="w-18 h-18 rounded-full flex justify-center items-center bg-red">
                      <ExclamationIcon className="fill-white w-4" />
                    </div>
                  )}
                </>
              )}
            </div>
            {isButtonClicked && (
              <div className="ml-13 font-pretendard text-caption-1">
                {isNicknameAvailable ? (
                  <span className="text-confirmBlue">사용 가능한 닉네임입니다.</span>
                ) : (
                  <span className="text-red">사용 불가능한 닉네임입니다.</span>
                )}
              </div>
            )}
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

import axios from "axios";
import { useState } from "react";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { ReactComponent as ExclamationIcon } from "assets/icons/button/exclamation.svg";

const NicknameInput = () => {
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
    <>
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
    </>
  );
};

export default NicknameInput;

import { useState } from "react";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { ReactComponent as ExclamationIcon } from "assets/icons/button/exclamation.svg";
import { validateNickname } from "features/register/function/NicknameValidation";
import { FC } from "react";
import { checkNicknameAvailable } from "services/api/user/index";

interface NicknameInputProps {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  onCheckResult?: (isAvailable: boolean, error?: string) => void;
}

const NicknameInput: FC<NicknameInputProps> = ({ nickname, setNickname, onCheckResult = () => {} }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDuplicationCheck = async (nickname: string) => {
    // 1. 유효성 검사
    const validationError = validateNickname(nickname);
    if (validationError) {
      setErrorMessage(validationError);
      setIsNicknameAvailable(false);
      setIsButtonClicked(true);
      onCheckResult(false, validationError);
      return;
    }

    // 2. 중복확인 API 호출
    try {
      const res = await checkNicknameAvailable({ nickname });
      const isAvailable = res.isAvailable;

      if (!isAvailable) {
        setIsNicknameAvailable(false);
        setErrorMessage(res.reason || "이미 사용 중인 닉네임입니다.");
        onCheckResult(false, res.reason || "이미 사용 중인 닉네임입니다.");
      } else {
        setIsNicknameAvailable(true);
        setErrorMessage("");
        onCheckResult(true);
      }
    } catch (err) {
      setErrorMessage("중복 확인 요청에 실패했습니다.");
      setIsNicknameAvailable(false);
      onCheckResult(false, "중복 확인 요청에 실패했습니다.");
    } finally {
      setIsButtonClicked(true);
    }
  };

  return (
    <>
      <div
        className={`w-full h-44 border-2 rounded-10 overflow-hidden flex flex-row items-center justify-between px-16 
          ${isInputFocused ? "border-mainBlue" : "border-font-whitegrayLight"} 
          ${isButtonClicked ? (isNicknameAvailable ? "border-confirmBlue" : "border-red") : ""}`}
      >
        <input
          className="w-full h-full outline-none"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setIsButtonClicked(false);
            setIsNicknameAvailable(null);
            setErrorMessage("");
            onCheckResult(false);
          }}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {!isButtonClicked && (
          <button
            onClick={() => handleDuplicationCheck(nickname)}
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

      {/* 에러 메시지 */}
      {errorMessage && <div className="ml-13 mt-4 font-pretendard text-caption-1 text-red">{errorMessage}</div>}
      {/* 성공 메시지 */}
      {isButtonClicked && isNicknameAvailable && !errorMessage && (
        <div className="ml-13 mt-4 font-pretendard text-caption-1 text-confirmBlue">사용 가능한 닉네임입니다.</div>
      )}
    </>
  );
};

export default NicknameInput;
